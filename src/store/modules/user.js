import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'vue-elm-user',
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
