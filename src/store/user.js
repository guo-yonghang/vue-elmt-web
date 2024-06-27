import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'system-user',
  state: () => ({
    userInfo: {},
  }),
  getters: {},
  actions: {},
  persist: {
    key: 'persist-user',
    storage: window.localStorage,
    paths: ['userInfo'],
  },
})
