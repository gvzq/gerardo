import Wappalyzer from 'wappalyzer';
import validUrl from 'valid-url';
import NextCors from 'nextjs-cors';
import cohere from 'cohere-ai';

cohere.init(process.env.COHERE_KEY);
const wappalyzer = new Wappalyzer();

export default async function handler(request, response) {
  await NextCors(request, response, {
    methods: ['GET', 'HEAD', 'PUT', 'POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  let { website } = request.body;

  if (typeof website === 'string') {
    website = website.trim();
  }

  if (!validUrl.isUri(website)) {
    return response.status(400).send({ error: `'${website}' is not a valid URL` });
  }

  try {
    await wappalyzer.init();
    const site = await wappalyzer.open(website);
    const tech = await site.analyze();
    let categories = tech?.technologies
      .flatMap((t) => t.categories.map((category) => category.name));
    categories = Array.from(new Set(categories));
    // console.log(categories.join(', '));

    const ai = await cohere.generate({
      model: 'command-xlarge-nightly',
      prompt: `Write a paragraph explaining the  benefits of the website (${website}) based from the following technologies: ${categories.join(', ')}.`,
      max_tokens: 100,
      temperature: 0.9,
      k: 0,
      stop_sequences: [],
      return_likelihoods: 'NONE',
    });

    tech.description = ai.body.generations[0].text;

    // tech.technologies = tech?.technologies
    //   .filter((elem) => elem?.confidence > 0)
    //   .sort((a, b) => {
    //     const keyA = a?.categories[0]?.id;
    //     const keyB = b?.categories[0]?.id;
    //     if (keyA < keyB) return -1;
    //     if (keyA > keyB) return 1;
    //     return 0;
    //   });
    // console.log(tech);
    await wappalyzer.destroy();
    // console.log(JSON.stringify(tech));
    return response.json(tech);
  } catch (error) {
    // console.error(error, error.message.toString());
    return response.status(400).send({ error: error.message });
  }
}
