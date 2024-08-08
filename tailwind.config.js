/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        primary: '#FF9F24', 
        secondary: '#969696', 
        darkGray: '#0F0D23',
      },
    },
  },
  plugins: [],
}
