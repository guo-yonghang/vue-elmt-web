import { defineStore } from 'pinia'

export const useTabStore = defineStore({
  id: 'system-tab',
  state: () => ({
    homePath: '',
    tabList: [],
  }),
  getters: {},
  actions: {
    //添加tab
    addTab(route) {
      if (!this.tabList.some((item) => item.path === route.fullPath)) {
        const funKey = route.fullPath === this.homePath ? 'unshift' : 'push'
        this.tabList[funKey]({
          path: route.fullPath,
          title: route.meta.title,
          icon: route.meta.icon,
        })
      }
      console.log('-----this.tabList', this.tabList)
    },
    //删除tab
    delTab() {},
  },
  persist: {
    key: 'persist-tab',
    storage: window.sessionStorage,
    paths: ['tabList'],
  },
})
