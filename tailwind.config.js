/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Next.js 13 app 디렉토리를 사용할 경우
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["pretendard"],
      },
      colors: {
        "eco-main": "#4CC699",
      },
    },
  },
  plugins: [],
};
