import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'

import pinia from '@/store/index'
import router from '@/router/index'
import i18n from '@/languages/index'
import directives from '@/directives/index'

import 'virtual:svg-icons-register'
import '@/styles/index.scss'

const app = createApp(App)
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key])
})
//未使用auto-import自动导入组件 因为在componetIs渲染组件时无法被渲染
app.use(ElementPlus).use(pinia).use(router).use(i18n).use(directives).mount('#app')
