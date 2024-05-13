import type { Config } from "tailwindcss"
import flowbite from "flowbite-react/tailwind";

const config = {
  darkMode: ["class"],
  content: [
    flowbite.content(),
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
    require("tailwindcss-animate")],
} satisfies Config

export default config