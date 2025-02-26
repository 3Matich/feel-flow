/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        "feel-1": "#010D26", //dark-blue
        "feel-2": "#113A79", //medium-blue 
        "feel-3": "#BF5866", //rose
        "feel-4": "#F25D50", //coral
        "feel-5": "#FFEFD8", //beige
        "feel-6": "#FAFAFA",
        "warning-light": "#E49B33",
        "warning-dark": "#A8323E",
        "alert-light": "#C7822B",
        "alert-dark": "#7D1C24",
        "success-light": "#2B7A44",
        "success-dark": "#3AAB58"
      },
      backgroundColor: {
        "light-bg": "#F8FAFC", // Fondo claro
        "dark-bg": "#010D26",  // Fondo oscuro
      },
      backgroundImage: {
        'gradient-custom': "linear-gradient(to right, #FFEDD9 0%, #FFEDD9 13.37%, #F1664A 26.75%, #F1664A 43.84%, #183E7B 60.93%, #183E7B 80.46%, #000B23 100%)",
      },
    },
  },
  plugins: [],
});
