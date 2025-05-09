import {resolve} from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'home.html'),
        calendar: resolve(__dirname, 'calendar.html'),
        hrv: resolve(__dirname, 'hrv.html'),
        info: resolve(__dirname, 'info.html'),
      },
    },
  },
  base: './',
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
