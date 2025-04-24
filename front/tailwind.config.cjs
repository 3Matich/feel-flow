/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const { red } = require('@mui/material/colors');

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        "feel-1": "#010D26", // Dark blue
        "feel-2": "#113A79", // Medium blue
        "feel-3": "#BF5866", // Rose
        "feel-4": "#F25D50", // Coral
        "feel-5": "#FFEFD8", // Beige
        "feel-6": "#FAFAFA", // White alternative
        "warning-light": "#E49B33", // Color para el texto de los botones
        "warning-dark": "#A8323E", // Color para el texto de los botones
        "alert-light": "#C7822B", // Color para el texto de los botones
        "alert-dark": "#7D1C24", // Color para el texto de los botones
        "success-light": "#2B7A44", // Color para el texto de los botones
        "success-dark": "#3AAB58", // Color para el texto de los botones

        // Tema Claro
        "light-primary": "#FAFAFA", // Blanco alternativo (acciones clave) ############ Sidebar y Navbar
        "light-secondary": "#FFEFD8", // Baige (acciones secundarias)
        "light-bg": "#F8F9FA", // Fondo claro
        "light-text": "#333333", // Texto principal
        "light-text-secondary": "#6B7280", // Texto secundario
        "light-card": "#FFFFFF", // Fondo de tarjetas
        "light-border": "#E5E7EB", // Bordes y sombras
        "light-button-success": "#F8F9FA", // Color para el fondo de los botones
        "light-button-alert": "#F8F9FA", // Color para el fondo de los botones
        "light-button-warning": "#F8F9FA", // Color para el fondo de los botones


        // Tema Oscuro
        "dark-primary": "#010D26", // Azul eléctrico ############ Sidebar y Navbar
        "dark-secondary": "#F25D50",// 880e38"#F25D50", // pink-900
        "dark-bg": "#121212", // Fondo oscuro
        "dark-text": "#f1f1f1", // EAEAEA Texto principal
        "dark-text-secondary": "#A1A1A1", // Texto secundario
        "dark-card": "#1A1A2E", // Fondo de tarjetas
        "dark-border": "#1F2937", // Bordes y sombras
        "dark-button-success": "#121212", // Color para el fondo de los botones
        "dark-button-alert": "#121212", // Color para el fondo de los botones
        "dark-button-warning": "#121212", // Color para el fondo de los botones
      },
      backgroundColor: { // Fondos div principal
        "light-bg": "#F8F9FA", //
        "dark-bg": "#010f19", //010d14 010d1e 05183C 121212
      },
      backgroundImage: {
        'gradient-custom': "linear-gradient(to right, #FFEDD9 0%, #FFEDD9 13.37%, #F1664A 26.75%, #F1664A 43.84%, #183E7B 60.93%, #183E7B 80.46%, #000B23 100%)",
      },
    },
  },
  plugins: [],
});
