/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00FF88',
        dark: '#1B1234',
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(180deg, #00FF88 0%, #1B1234 100%)',
      },
    },
  },
  plugins: [],
}
