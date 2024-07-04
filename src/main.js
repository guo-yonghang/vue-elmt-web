import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'

import pinia from '@/store/index'
import router from '@/router/index'
import i18n from '@/languages/index'

import 'virtual:svg-icons-register'
import '@/styles/index.scss'

const app = createApp(App)
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key])
})
app.use(ElementPlus).use(pinia).use(router).use(i18n)
app.mount('#app')
