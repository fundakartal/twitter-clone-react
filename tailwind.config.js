module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        white: {
          base: 'rgb(231,233,234)',
        },
        blue: {
          base: '#1d9bf0',
          dark: '#1b8edb',
        },
        gray: {
          base: 'rgba(15,20,25,0.2)',
          dark: 'rgb(47,51,54)',
          light: 'rgb(113,118,123)',
        },
      },
      screens: {
        sm: '500px',
        xxs: { raw: '(min-height: 500px)' },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
