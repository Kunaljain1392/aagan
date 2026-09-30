/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#030710',
          900: '#050B18', // Primary deep background
          850: '#081022',
          800: '#0B1528', // Surface card
          750: '#0E1C35',
          700: '#13223E', // Elevated panel
          600: '#1C3156', // Border subtle
          500: '#2A4372',
        },
        terracotta: {
          DEFAULT: '#E0801F', // Warm terracotta brick accent
          dark: '#B85A00',
          light: '#FFA733',
          glow: 'rgba(224, 128, 31, 0.25)',
        },
        nature: {
          DEFAULT: '#2E7D32', // Bio green
          dark: '#1B5E20',
          light: '#4CAF50',
          emerald: '#10B981',
        },
        commercial: {
          DEFAULT: '#0F8A7A', // Teal commercial
          dark: '#08574D',
          light: '#26A69A',
        },
        structural: {
          DEFAULT: '#6B3FB5', // Purple structural
          dark: '#4A2885',
          light: '#9575CD',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cinzel', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-terracotta': '0 0 25px rgba(224, 128, 31, 0.2)',
        'glow-teal': '0 0 25px rgba(15, 138, 122, 0.25)',
        'glow-green': '0 0 25px rgba(46, 125, 50, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
