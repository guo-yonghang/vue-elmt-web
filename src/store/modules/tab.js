import { defineStore } from 'pinia'

export const useTabStore = defineStore({
  id: 'vue-elm-tab',
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
