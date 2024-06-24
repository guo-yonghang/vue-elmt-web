import { createApp } from 'vue'
import App from './App.vue'
import * as Icons from '@element-plus/icons-vue'

import '@/styles/index.scss'
import 'element-plus/theme-chalk/src/message.scss'
import 'nprogress/nprogress.css'

import pinia from '@/store/index'
import router from '@/router/index'
import i18n from '@/languages/index'

const app = createApp(App)
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key])
})
app.use(pinia).use(router).use(i18n)
app.mount('#app')
