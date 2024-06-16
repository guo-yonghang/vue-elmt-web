import { createApp } from 'vue'
import App from './App.vue'
import * as Icons from '@element-plus/icons-vue'

import '@/styles/index.scss'
import '@/styles/common.scss'
import '@/styles/reset.scss'
import 'element-plus/theme-chalk/src/message.scss'
import 'nprogress/nprogress.css'

import pinia from '@/store'
import router from '@/router'

const app = createApp(App)
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key])
})
app.use(pinia).use(router)
app.mount('#app')
