import { createApp } from 'vue'
import App from './App.vue'

import '@/styles/index.scss'
import 'element-plus/theme-chalk/src/message.scss'
import 'nprogress/nprogress.css'

import pinia from '@/store'

const app = createApp(App)
app.use(pinia)
app.mount('#ap')
