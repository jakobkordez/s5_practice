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
        primary: {
          light: "#00F4FF",
          DEFAULT: "#00ADB5",
          dark: "#008288",
          darker: "#00656A",
        },
        light: "#EEEEEE",
      }
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
      }
    }
  },
  plugins: [],
}

