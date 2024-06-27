import { defineStore } from 'pinia'

export const useTabStore = defineStore({
  id: 'system-tab',
  state: () => ({
    tabList: {},
  }),
  getters: {},
  actions: {},
  persist: {
    key: 'persist-tab',
    storage: window.sessionStorage,
    paths: ['tabList'],
  },
})
