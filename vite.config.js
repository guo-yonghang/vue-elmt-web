import { defineConfig } from 'vite'
import { resolve } from 'path'
import { createVitePugins } from './vite-plugins'

export default defineConfig({
  base: './',
  plugins: createVitePugins(),
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    chunkSizeWarningLimit: 2000,
  },
})
