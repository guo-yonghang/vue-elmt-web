import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { createVitePugins } from './vite-plugins'

export default defineConfig({
  plugins: createVitePugins(),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
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
  },
})
