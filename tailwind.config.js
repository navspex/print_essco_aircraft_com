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
        'essco-black': '#000000',
        'essco-dark-gray': '#4d4d4d',
        'essco-light-gray': '#CECECD',
        'essco-bg': '#f8f8f8',
        'essco-blue': '#069',
        'essco-orange': '#f60',
      },
      fontFamily: {
        'oswald': ['Oswald', 'sans-serif'],
      },
      fontSize: {
        'section-title-mobile': '15px',      // 107% of 14px base
        'section-title-tablet': '26.32px',   // 188% of 14px base
        'section-title-desktop': '43.82px',  // 313% of 14px base
        'section-desc-mobile': '15px',       // 107% of 14px base
        'section-desc-tablet': '12.32px',    // 88% of 14px base
        'section-desc-desktop': '17.5px',    // 125% of 14px base
      },
      maxWidth: {
        'logo': '211px',
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
