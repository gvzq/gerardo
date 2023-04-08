import Wappalyzer from 'wappalyzer';
import validUrl from 'valid-url';

const getTechnologies = async (req, res) => {
  let { website } = req.body;

  if (typeof website === 'string') {
    website = website.trim();
  }

  if (!validUrl.isUri(website)) {
    return res.status(400).send({ error: `'${website}' is not a valid URL` });
  }

  const wappalyzer = new Wappalyzer();
  try {
    await wappalyzer.init();
    const site = await wappalyzer.open(website);
    site.on('error', (e) => {
      console.error(`wappalyzer error: ${e}`);
    });
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
    return res.json(tech);
  } catch (error) {
    console.error(error, error.message.toString());
    return res.status(400);
  }
};

export default getTechnologies;
