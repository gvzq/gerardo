export default function handler(req, response) {
  return response.json({ location: req.headers.get('x-vercel-ip-city') || 'world' });
}
