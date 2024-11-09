/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-background': '#101010',
        'dark-light': '#171717',
        'dark-light-border': '#464646',
        'dark-white': '#FEFEFE',
      },
      screens: {
        'tiny':  '320px',
        'small':  '425px',
        'medium':  '768px',
        'large':  '1024px',
      },
      backgroundImage: {
       'purple-pink-gradient': 'linear-gradient(to right, #B515DF, #D528A7)',
       'pink-purple-gradient': 'linear-gradient(to left, #B515DF, #D528A7)',
      },
    },
  },
  plugins: [],
}