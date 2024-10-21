import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        darker: '#222831',
        dark: '#393E46',
        primary: {
          light: '#00F4FF',
          DEFAULT: '#00ADB5',
          dark: '#008288',
          darker: '#00656A',
        },
        light: '#F8FAFA',
      },
    },
    container: {
      padding: '2rem',
      center: true,
      screens: {
        DEFAULT: '100%',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
