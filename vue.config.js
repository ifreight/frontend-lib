const path = require('path');
const { defineConfig } = require('@vue/cli-service');
const CopyPlugin = require('copy-webpack-plugin');

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: path.resolve(__dirname, './src/styles/abstracts/*.css'),
      injector: 'append',
    });
}

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) => addStyleResource(config.module.rule('css').oneOf(type)));

    if (process.env.NODE_ENV === 'production') {
      config.externals({
        'libphonenumber-js': 'libphonenumber-js',
        'vue-popperjs': 'vue-popperjs',
        'vue-imask': 'vue-imask',
        dayjs: 'dayjs',
        'lodash/debounce': 'lodash/debounce',
      });
    }
  },
  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: 'node_modules/flag-icons/flags/4x3/*',
            to: 'img/flags/[name][ext]',
          },
        ],
      }),
    ],
  },
  css: {
    loaderOptions: {
      css: {
        url: {
          filter: (url) => {
            if (url.includes('img/flags')) {
              return false;
            }

            return true;
          },
        },
      },
    },
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      analyzerMode: process.env.NODE_ENV === 'production' ? 'static' : 'disabled',
      openAnalyzer: false,
    },
  },
});
