import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    flowbite.content(),
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        mono: [
          "var(--font-jetbrains-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
    },
  },
  plugins: [flowbite.plugin(), require("tailwindcss-animate")],
} satisfies Config;

export default config;
