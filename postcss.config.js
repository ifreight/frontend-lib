// const path = require('path');

module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    'postcss-custom-properties': {
      preserve: false,
    },
    autoprefixer: {},
  },
};
