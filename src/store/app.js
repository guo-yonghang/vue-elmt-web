import { defineStore } from 'pinia'
import { DEFAULT_PRIMARY } from '@/config/index'

export const useAppStore = defineStore({
  id: 'system-app',
  state: () => ({
    layoutRoute: null,
    collapse: false,
    primary: DEFAULT_PRIMARY,
    isDark: false,
    language: 'zh',
    comSize: 'default',
    showFooter: false,
    showHeader: true,
    showTabs: true,
    showTabsIcon: true,
    showWaterMark: false,
  }),
  getters: {},
  actions: {},
  persist: {
    key: 'persist-app',
    storage: window.localStorage,
    paths: ['primary', 'isDark', 'language', 'comSize', 'showFooter', 'showHeader', 'showTabs', 'showTabsIcon', 'showWaterMark'],
  },
})
