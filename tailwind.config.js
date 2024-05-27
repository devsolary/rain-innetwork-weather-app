/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "sunnyImg": "url(./src/assets/images/rainny.jpg)"
      }
    },
  },
  variants:{
    extend:{},
  },
  plugins: [],
}

