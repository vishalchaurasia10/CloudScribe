/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        'jost': ['Jost', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      keyframes : {
        expand : {
          '0%' : { width: '0%' },
          '100%' : { width: '100%' },
        }
      },
      animation : {
        expand : 'expand 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}
