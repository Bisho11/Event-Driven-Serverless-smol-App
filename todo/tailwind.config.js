// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        softred :'#e63946',
        staffy : '#BFAC88',
        darkred : '#8C3243',
      },
      fontFamily:{
        open : ["Open Sans", "sans-serif"],
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};