/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,jsx,ts,tsx}', './public/index.html'], // 追記
  theme: {
    extend: {
      fontFamily: {
        title: ['Acuta,serif'],
        text: ['Noto Serif JP'],
        buttonText: ['Acuta'],
      },
      colors: {
        main: ['#333333'],
        label: ['#B6B4B0'],
      },
      backgroundColor: {
        portfolioLine: ['#333333'],
        inputBg: ['#B6B4B0'],
      },
      borderColor: {
        line: ['#333333'],
        input: ['#B6B4B0'],
      },
      keyframes: {
        slideView1: {
          from: {
            transform: 'translate(400%)',
          },
          "50%":{
            transform: 'translate(100%)',
          },
          to: {
            transform: 'translate(-200%)',
          },
        },
        slideView2: {
          from: {
            transform: 'translate(400%)',
          },
          to: {
            transform: 'translate(-200%)',
          },
        },
        slideView3: {
          from: {
            transform: 'translate(400%)',
          },
          to: {
            transform: 'translate(-200%);',
          },
        },
        slideView4: {
          from: {
            transform: 'translate(400%)',
          },
          to: {
            transform: 'translate(-200%);',
          },
        },
      },
      animation: {
        slideView1: 'slideView1 40s linear infinite;',
        slideView2: 'slideView2 50s linear infinite;',
        slideView3: 'slideView3 60s linear infinite;',
        slideView4: 'slideView4 70s linear infinite;',
      },
    },
  },
  plugins: [],
};
