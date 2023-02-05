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
        'DancingScript': ['Dancing Script', 'cursive'],
      },
      keyframes : {
        expand : {
          '0%' : { width: '0%' },
          '100%' : { width: '100%' },
        },
        scale : {
          '0%' : { transform: 'scale(0)' },
          '100%' : { transform: 'scale(1)' },
        },
        alert : {
          '0%' : { transform: 'translateY(0)' },
          '50%' : { transform: 'translateY(12rem)' },
          '100%' : { transform: 'translateY(11rem)' },
        }
      },
      animation : {
        expand : 'expand 0.5s ease-in-out',
        scale : 'scale 1s ease-in-out',
        alert : 'alert 1s ease-in-out',
      },
    },
  },
  plugins: [],
}
