/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  important: true,
  content: ['./src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      transparent: 'var(--transparent)',
      white: 'var(--white)',
      black: 'var(--black)',
      gray: {
        50: 'var(--gray-50)',
        70: 'var(--gray-70)',
        100: 'var(--gray-100)',
        120: 'var(--gray-120)',
        200: 'var(--gray-200)',
        300: 'var(--gray-300)',
        400: 'var(--gray-400)',
        500: 'var(--gray-500)',
        800: 'var(--gray-800)',
        900: 'var(--gray-900)',
        950: 'var(--gray-950)',
      },
      yellow: {
        50: 'var(--yellow-50)',
        70: 'var(--yellow-70)',
        100: 'var(--yellow-100)',
        300: 'var(--yellow-300)',
        700: 'var(--yellow-700)',
      },
      indigo: {
        100: 'var(--indigo-100)',
        300: 'var(--indigo-300)',
      },
      red: {
        100: 'var(--red-100)',
        200: 'var(--red-200)',
        400: 'var(--red-400)',
      },
      green: {
        100: 'var(--green-100)',
        400: 'var(--green-400)',
      },
      orange: {
        100: 'var(--orange-100)',
        400: 'var(--orange-400)',
      },
      ochre: {
        700: 'var(--ochre-700)',
      },
    },
    fontSize: {
      '4xs': ['var(--size-4xs)'],
      '3xs': ['var(--size-3xs)'],
      '2xs': ['var(--size-2xs)'],
      xs: ['var(--size-xs)'],
      sm: ['var(--size-sm)'],
      base: ['var(--size-base)'],
      lg: ['var(--size-lg)'],
      xl: ['var(--size-xl)'],
      '2xl': ['var(--size-2xl)'],
      '3xl': ['var(--size-3xl)'],
      '4xl': ['var(--size-4xl)'],
      '5xl': ['var(--size-5xl)'],
      '6xl': ['var(--size-6xl)'],
      '7xl': ['var(--size-7xl)'],
      '8xl': ['var(--size-8xl)'],
      '9xl': ['var(--size-9xl)'],
    },
  },
  plugins: [],
};
