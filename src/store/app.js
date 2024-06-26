import { defineStore } from 'pinia'
import { DEFAULT_PRIMARY } from '@/config/index'

export const useAppStore = defineStore({
  id: 'vue-elm-app',
  state: () => ({
    layoutRoute: null,
    collapse: false,
    primary: DEFAULT_PRIMARY,
    isDark: false,
    language: 'zh', // 'zh' | 'en'
    comSize: 'default', //'large' | 'default' | 'small'
    showFooter: false,
  }),
  getters: {},
  actions: {},
  persist: {
    key: 'persist-app',
    storage: window.localStorage,
    paths: ['primary', 'isDark', 'language', 'comSize'],
  },
})
