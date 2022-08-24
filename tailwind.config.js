/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,jsx,ts,tsx}', './public/index.html'], // 追記
  theme: {
    extend: {
      fontFamily: {
        title: ['Acuta'],
        text: ['Noto Serif JP'],
      },
      keyframes: {
        flowingText: {
          '0%': {
            width: '0%',
          },
          '100%': {
            width: '100%',
          },
        },
      },
      animation: {
        flowingText: 'flowingText 5s',
      },
      backgroundImage: {
        boader: "url('../public/boader.svg')",
      },
    },
  },
  plugins: [],
};
