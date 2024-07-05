import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'system-user',
  state: () => ({
    token: '',
    userInfo: {},
  }),
  getters: {},
  actions: {},
  persist: {
    key: 'persist-user',
    storage: window.localStorage,
    paths: ['token', 'userInfo'],
  },
})
