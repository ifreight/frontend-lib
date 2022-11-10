const path = require('path');
const { defineConfig } = require('@vue/cli-service');

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
  },
});
