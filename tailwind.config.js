/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        pink: "0 0 0.625em rgba(255, 192, 203)",
      },
    },
  },
  plugins: [],
};
