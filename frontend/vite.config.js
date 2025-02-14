import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    host: true,
    port: 3000, // Порт, на котором работает Vite (по умолчанию 3000)
    proxy: {
      '/api': {
        target: process.env.VITE_API_PROXY || 'http://localhost:8000', // Адрес Django сервера
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // build: {
  //   outDir: '../backend/static/frontend', // Выходная директория для статических файлов
  //   assetsDir: 'assets',
  //   emptyOutDir: true,
  // },
  build: {
    outDir: 'dist', // Убедитесь, что выходная директория — dist
    assetsDir: 'assets',
    emptyOutDir: true,
  },
});