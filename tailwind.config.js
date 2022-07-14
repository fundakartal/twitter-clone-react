module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        white: {
          base: '#d6d9db',
        },
        blue: {
          base: '#1d9bf0',
          dark: '#1b8edb',
          light: '#8ecdf8',
          extralight: '#d2ebfc',
        },
        // black: {
        //   base: 'rgb(15,20,25)',
        //   light: '#536471',
        // },
        gray: {
          base: 'rgba(15,20,25,0.2)',
          dark: 'rgb(47,51,54)',
          // light: '#e7e7e8',
          light: 'rgb(113,118,123)',
          extralight: '#f7f9f9',
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
