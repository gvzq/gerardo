// import cohere from 'cohere-ai';

// cohere.init(process.env.COHERE_KEY);

// export default async function handler(request, responses) {
//   const response = await cohere.generate({
//     model: 'command-xlarge-nightly',
//     prompt: 'Write a website description for a wireless headphone product named the CO-1T, with the keywords "bluetooth", "wireless", "fast charging" for a software developer who works in noisy offices, and describe benefits of this product.',
//     max_tokens: 300,
//     temperature: 0.9,
//     k: 0,
//     stop_sequences: [],
//     return_likelihoods: 'NONE',
//   });
//   // console.log(`Prediction: ${response.body.generations[0].text}`);
//   return responses.json(response.body.generations[0].text);
// }
