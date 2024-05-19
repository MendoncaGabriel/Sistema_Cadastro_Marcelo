/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/views/**/*.{js,ejs}"],
  theme: {
    extend: {
      colors:{
        c0: "#14293D",
        c1: '#016494',
        c2: '#247BA0',
        c3: '#1C99E0',
        c4: '#E8F1F3',
        c5: '#13293D',
      },
    },
  },
  plugins: [],
}