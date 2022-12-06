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
        gilroybold: ['Gilroy-Bold'],
        gilroysemibold: ['Gilroy-SemiBold'],
        gilroymedium: ['Gilroy-Medium'],
        gilroylight: ['Gilroy-Light'],
        gilroy: ['Gilroy'],
        indie: ['IndieFlower'],
      },
      colors: {
        'ay-green': '#1dc468',
        'ay-lightgray': '#f5f5f5',
      },
    },
  },
  plugins: [],
};
