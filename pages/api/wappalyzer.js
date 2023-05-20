/**
 * TODO Vercel functions are hosted in AWS.
 * Migrate Puppeter to puppeteer-core and use chrome-aws-lambda
 * Implement a Wapalyzer API like in node_modules/wappalyzer/driver.js
 * but using the dependencies listes above. Examples:
 *      https://github.com/imhunterand/crossfeed/blob/c845d10fbe205aa5c6af1950fdf268ab7660a42b/backend/src/tasks/helpers/simple-wappalyzer.ts#L27
 *      https://github.com/zcaceres/snippets/blob/c1f05843d7fce9e61b841b04e520b5c58e718fd3/js-ts/minimalist-wappalyzer.js#L2
 * Source: https://gist.github.com/kettanaito/56861aff96e6debc575d522dd03e5725
 *  */

export default function handler(req, response) {
  return response.json({ api: 'todo', req });
}
