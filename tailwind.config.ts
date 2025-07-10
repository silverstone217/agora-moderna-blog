import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // adapte selon ton projet
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
    // autres plugins si besoin
  ],
};

export default config;
