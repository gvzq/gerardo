import validUrl from 'valid-url';
import NextCors from 'nextjs-cors';
import cohere from 'cohere-ai';

cohere.init(process.env.COHERE_KEY);

export default async function handler(request, response) {
  await NextCors(request, response, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
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
    const headers = new Headers({
      'x-api-key': 'gerardo-x-key',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify({ website }),
    };
    const tech = await fetch(`${process.env.ANALYZE_REST}/api/analyze`, requestOptions)
      .then((r) => r.json());

    let categories = tech?.technologies
      .flatMap((t) => t.categories.map((category) => category.name));
    categories = Array.from(new Set(categories));
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
    return response.json(tech);
  } catch (error) {
    return response.status(400).send({ error: error.message });
  }
}
