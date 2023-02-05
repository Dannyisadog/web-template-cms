/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3187f6',
        primary_light: '#ddebff',
        primary_dark: '#113d77',
        site_black: '#333'
      }
    },
  },
  plugins: [],
}
