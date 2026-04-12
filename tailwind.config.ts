/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#dfc07d',
          DEFAULT: '#d4af37',
          dark: '#aa8c2c',
        },
        stone: {
          950: '#0c0c0c',
        }
      },
      letterSpacing: {
        widest: '.25em', // Perfect for luxury headings
      }
    },
  },
  plugins: [],
}