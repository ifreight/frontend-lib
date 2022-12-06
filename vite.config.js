import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';
import serveStatic from 'serve-static';

import { defineConfig } from 'vite';
import vue2 from '@vitejs/plugin-vue2';

const staticAssets = () => ({
  name: 'static-assets',
  configureServer(server) {
    server.middlewares.use(serveStatic('static', { index: false }));
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue2(), staticAssets()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: '9100',
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/main-lib.js'),
      name: 'FrontendLib',
      fileName: 'frontend-lib',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'dayjs', 'libphonenumber-js', 'vue-popperjs', 'vue-imask'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          dayjs: 'dayjs',
          'libphonenumber-js': 'libphonenumber',
          'vue-popperjs': 'vue-popper',
          'vue-imask': 'vue-imask',
        },
      },
    },
  },
});
