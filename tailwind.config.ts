import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        agmena: ["var(--font-agmena)", "sans-serif"],
        mantinia: ["var(--font-mantinia)", "sans-serif"],
      },
      colors: {
        primary: "#FFB84D",
      },
    },
  },
  plugins: [],
};

export default config;
