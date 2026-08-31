/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#040911',
          900: '#07111F',
          850: '#0B192C',
          800: '#0F223D',
          700: '#163359',
          600: '#1E3E62',
          500: '#285586',
          400: '#3D74B0',
          300: '#6FA1D8',
          100: '#E6EFF9',
          50: '#F2F7FD',
        },
        gold: {
          700: '#8A6820',
          600: '#A9812A',
          500: '#C5A059',
          400: '#D4AF37',
          300: '#E5C46D',
          200: '#F2DCA0',
          100: '#F9F1DC',
          50: '#FCF9F0',
        },
        academic: {
          blue: '#1565C0',
          dark: '#0A1931',
          light: '#EBF3FB',
          border: '#DCE6F1',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Merriweather"', '"Lora"', '"Playfair Display"', 'Georgia', 'serif'],
        classic: ['"Merriweather"', 'Georgia', 'serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(7, 17, 31, 0.04)',
        'card': '0 4px 20px -2px rgba(7, 17, 31, 0.06), 0 2px 6px -1px rgba(7, 17, 31, 0.04)',
        'card-hover': '0 20px 35px -8px rgba(7, 17, 31, 0.12), 0 6px 12px -2px rgba(7, 17, 31, 0.06)',
        'nav': '0 4px 25px rgba(7, 17, 31, 0.08)',
        'mega': '0 20px 40px -10px rgba(7, 17, 31, 0.18)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
