/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        gilroy: ['Gilroy'],
      },
      colors: {
        'ay-green': '#1dc468',
        'ay-lightgray': '#f5f5f5',
      },
    },
  },
  plugins: [],
};
