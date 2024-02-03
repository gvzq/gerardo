/**
 * TODO Vercel functions are hosted in AWS.
 * Migrate Puppeter to puppeteer-core and use chrome-aws-lambda
 * Implement a Wapalyzer API like in node_modules/wappalyzer/driver.js
 * but using the dependencies listes above. Examples:
 *      https://github.com/imhunterand/crossfeed/blob/c845d10fbe205aa5c6af1950fdf268ab7660a42b/backend/src/tasks/helpers/simple-wappalyzer.ts#L27
 *      https://github.com/zcaceres/snippets/blob/c1f05843d7fce9e61b841b04e520b5c58e718fd3/js-ts/minimalist-wappalyzer.js#L2
 * Source: https://gist.github.com/kettanaito/56861aff96e6debc575d522dd03e5725
 *  */
import Wappalyzer from 'wappalyzer';
import validUrl from 'valid-url';
import NextCors from 'nextjs-cors';

const wappalyzer = new Wappalyzer();

export default async function handler(request, response) {
  await NextCors(request, response, {
    methods: ['GET', 'HEAD', 'POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  let { website } = JSON.parse(request.body) || request.body;

  if (typeof website === 'string') {
    website = website.trim();
  }

  if (!validUrl.isUri(website)) {
    return response
      .status(400)
      .send({ error: `'${website}' is not a valid URL` });
  }

  try {
    await wappalyzer.init();
    const site = await wappalyzer.open(website);

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

    let categories = tech?.technologies.flatMap(
      (t) => t.categories.map((category) => category.name),
    );
    categories = Array.from(new Set(categories));

    return response.json({
      technologies: tech.technologies,
      categories,
    });
  } catch (error) {
    return response.status(500).send(`Error during analysis: ${error}`);
  }
}
