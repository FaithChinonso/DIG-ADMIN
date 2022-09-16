/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/*.{html,js,jsx,tsx}",
    "./src/components/*.{html,js,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "2xl": "3px 5px 15px rgba(0, 0, 0, 0.12)",
        "3xl": "3px 15px 15px rgba(0, 0, 0, 0.12)",
      },
      colors: {
        lightGray: "#f5f5f5",
        softGray: "#c1c1c1",
        darkPurple: "#4B0081",
        lightPurple: "rgba(75,0,129, .8)",
      },
    },
  },
  plugins: [],
};
