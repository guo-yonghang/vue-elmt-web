import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'system-user',
  state: () => ({
    token: '',
    userInfo: {},
    authMenuList: [
      '/preview/table/useSuperTable',
      '/preview/table/useBaseTable',
      '/preview/form/useSuperForm',
      '/preview/form/useBaseForm',
      '/preview/upload/useSuperUpload',
      '/preview/upload/useBaseUpload',
      '/preview/myself/infomation',
      '/preview/result/success',
      '/preview/result/warning',
      '/preview/result/error',
      '/table/useSuperTable',
      '/table/useBaseTable',
      '/form/useSuperForm',
      '/form/useBaseForm',
      '/upload/useSuperUpload',
      '/upload/useBaseUpload',
      '/myself/infomation',
      '/result/success',
      '/result/warning',
      '/result/error',
    ],
    authButtonList: [],
  }),
  getters: {},
  actions: {},
  persist: {
    key: 'persist-user',
    storage: window.localStorage,
    paths: ['token', 'userInfo'],
  },
})
