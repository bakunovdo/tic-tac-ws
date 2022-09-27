/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./apps/client/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
