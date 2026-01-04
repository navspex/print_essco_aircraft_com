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
        'essco-navy': '#0F172A',
        'essco-navy-light': '#1E293B',
        'essco-gold': '#F59E0B',
        'essco-gold-light': '#FBBF24',
        'essco-gold-pale': '#FEF3C7',
      },
      fontFamily: {
        'oswald': ['Oswald', 'sans-serif'],
      },
      fontSize: {
        'section-title-mobile': '15px',
        'section-title-tablet': '26.32px',
        'section-title-desktop': '43.82px',
        'section-desc-mobile': '15px',
        'section-desc-tablet': '12.32px',
        'section-desc-desktop': '17.5px',
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
