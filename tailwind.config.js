/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,jsx,ts,tsx}', './public/index.html'], // 追記
  theme: {
    extend: {
      fontFamily: {
        title: ['Acuta'],
        text: ['Noto Serif JP'],
        buttonText: ['Acuta'],
      },
      colors: {
        main: ['#333333'],
      },
      backgroundColor: {
        portfolioLine: ['#333333'],
      },
      borderColor: {
        line: ['#333333'],
      },
    },
  },
  plugins: [],
};
