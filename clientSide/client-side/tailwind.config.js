module.exports = {
  mode: "jit",
  content: ["./src/**/**/*.{js,ts,jsx,tsx,html,mdx}", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        white: { A700: "#ffffff" },
        gray: { 50: "#f6f7fb", 500: "#9f9f9f", 800: "#393d46", "500_87": "#9f9f9f87" },
        blue_gray: { 100: "#cdcfd1", "100_87": "#cdcfd187" },
        yellow: { 400: "#fae952" },
      },
      boxShadow: {},
      fontFamily: { poppins: "Poppins" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
