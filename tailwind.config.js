/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'essco-maroon': '#6e4b6c',
        'essco-dark-gray': '#4d4d4d',
      },
      fontFamily: {
        'oswald': ['Oswald', 'sans-serif'],
      },
      maxWidth: {
        'logo': '211px',
        'content': '1280px',
      },
      spacing: {
        'section': '1.5em',
      },
      lineHeight: {
        'relaxed': '1.5',
      },
      zIndex: {
        '100': '100',
      },
    },
  },
  plugins: [],
}
