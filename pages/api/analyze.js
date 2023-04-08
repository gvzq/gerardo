import Wappalyzer from 'wappalyzer';
import validUrl from 'valid-url';

const wappalyzer = new Wappalyzer();

export default async function handler(request, response) {
  // const { name } = request.query;
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
    // site.on('error', (e) => {
    //   // console.error(`wappalyzer error: ${e}`);
    // });
    const tech = await site.analyze();
    tech.technologies = tech?.technologies
      .filter((elem) => elem?.confidence > 0)
      .sort((a, b) => {
        const keyA = a?.categories[0]?.id;
        const keyB = b?.categories[0]?.id;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
    await wappalyzer.destroy();
    return response.json(tech);
  } catch (error) {
    // console.error(error, error.message.toString());
    return response.status(400).json(error.message);
  }
}
