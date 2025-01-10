/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        myBlue: 'var(--blue)', // Use the CSS variable for the primary color
        myWhite: 'var(--white)', // Use the CSS variable for the secondary color
        myHalfWhite: 'var(--half-white)', // Use the CSS variable for the secondary color
      },
      grayscale: {
        80: '80%', // Add custom grayscale value
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    
  ],
};
