/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        grotesque: ["var(--font-grotesque)", "sans"],
        "clash-display": ["var(--font-clash-display)", "sans"],
        conthrax: ["var(--font-conthrax)", "sans"],
        neue: ["var(--font-neue)", "sans"],
        uni: ["var(--font-uni)", "sans"],
        fhtotal: ["var(--font-fhtotal)", "sans"],
      },
    },
  },
  plugins: [],
});
