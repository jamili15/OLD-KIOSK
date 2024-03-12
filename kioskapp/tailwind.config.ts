import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-blue": "#53bffa",
      },
      maxWidth: {
        'full': '100%',
        'screen-xl': '3000px', // Adjust to your desired maximum width
      },
    },
  },
  plugins: [],
};
export default config;
