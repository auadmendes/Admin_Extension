/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx",
    "./public/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        trustly: '#0ee06e'  // example
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none', // For IE and Edge
          'scrollbar-width': 'none', // For Firefox
          overflow: '-moz-scrollbars-none', // For Firefox (alternative)
        },
      };

      addUtilities(newUtilities, ['responsive', 'dark']);
    },
  ],
}