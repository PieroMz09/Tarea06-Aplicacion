import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    },
    open: '/views/index.html'
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './views/index.html',
        nuevo: './views/nuevo.html',
        edit: './views/edit.html'
      }
    }
  }
})
