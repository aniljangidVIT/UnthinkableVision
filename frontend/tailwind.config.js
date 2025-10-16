/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0C0F17',
        'brand-blue': '#3A8BFF',
        'brand-navy': '#000B1F',
        'brand-gray': '#2A2D35',
        'brand-light': '#E0E1E6',
        'glow-blue': 'rgba(58, 139, 255, 0.5)',
      },
      keyframes: {
        wave: {
          '0%, 100%': { 'background-position': '0% 50%', transform: 'rotate(-3deg)' },
          '50%': { 'background-position': '100% 50%', transform: 'rotate(3deg)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
        swirl: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.2)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        wave: 'wave 8s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        swirl: 'swirl 6s linear infinite',
        fadeInUp: 'fadeInUp 1s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      fontSize: {
        '10xl': '10rem',
        '20xl': '20rem',
      },
    },
  },
  plugins: [],
}