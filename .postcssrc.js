module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    'postcss-custom-properties': {
      preserve: false,
      importFrom: ['./src/styles/abstracts/color.css', './src/styles/abstracts/size.css'],
      disableDeprecationNotice: true,
    },
    autoprefixer: {},
  },
};
