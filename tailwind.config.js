/** @type {import('tailwindcss').Config} */
const Flowbite = require('flowbite/plugin');

module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    Flowbite,
  ],
};
