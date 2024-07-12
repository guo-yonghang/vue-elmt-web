import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite'
import svgLoader from 'vite-svg-loader'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { visualizer } from 'rollup-plugin-visualizer'
import { resolve } from 'path'

export const createVitePugins = () => {
  return [
    vue(),
    vueJsx(),
    vueSetupExtend(),
    visualizer(),
    svgLoader(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'svg-[dir]-[name]',
    }),
  ]
}
