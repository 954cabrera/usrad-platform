module.exports = {
  content: [
    "./src/**/*.{astro,html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
      colors: {
        primary: '#003087',
        accent: '#cc9933',
        background: '#fcf9f0',
        backgroundAlt: '#f5e7c5',
      },
    },
  },
  plugins: [],
};
