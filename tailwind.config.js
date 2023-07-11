/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darker: "#222831",
        dark: "#393E46",
        primary: "#00ADB5",
        light: "#EEEEEE",
      }
    },
    container: {
      center: true,
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
      }
    }
  },
  plugins: [],
}

