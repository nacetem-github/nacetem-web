/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: "#006633",
        gold: "#C5A059",
        ink: "#1A1A1A",
        paper: "#FDFDFB",
      },
      fontFamily: {
        serif: ["Georgia", "ui-serif", "serif"],
        sans: ["Space Grotesk", "Helvetica Neue", "Arial", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  darkMode: false,
  plugins: [],
}
