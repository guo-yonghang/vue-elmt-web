import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
  ],
  resolve: {
    alias: {
      // "~/": `${path.resolve(__dirname, "src")}/`,
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.vue'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@use "~/styles/element/index.scss" as *;`,
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
  build: {
    outDir: 'vue-elm',
    minify: 'esbuild', //esbuild fast；terser can remove console
  },
})
