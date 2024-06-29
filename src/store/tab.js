import { defineStore } from 'pinia'
import router from '@/router'

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
      if (!route.meta.keepAlive) return
      if (!this.tabList.some((item) => item.path === route.path)) {
        const funKey = route.path === this.homePath ? 'unshift' : 'push'
        this.tabList[funKey]({
          path: route.path,
          title: route.meta.title,
          icon: route.meta.icon,
        })
      }
    },
    //删除当前
    delTab(path, isActive) {
      const index = this.tabList.findIndex((item) => item.path === path)
      this.tabList.splice(index, 1)
      if (isActive) {
        const nextRoute = this.tabList[index] || this.tabList[index - 1]
        router.push({ path: nextRoute.path })
      }
    },
    //删除左侧
    delTabLeft(index) {
      router.push(this.tabList[index].path)
      this.tabList = this.tabList.filter((item, idx) => idx >= index)
    },
    //删除右侧
    delTabRight(index, activePath) {
      const activeIndex = this.tabList.findIndex((item) => item.path === activePath)
      if (index < activeIndex) {
        router.push(this.tabList[index].path)
      }
      this.tabList = this.tabList.filter((item, idx) => idx <= index)
    },
    //删除其他
    delTabOther(index) {
      router.push(this.tabList[index].path)
      this.tabList = [this.tabList[index]]
    },
    //删除全部
    delTabAll() {
      this.tabList = []
      router.push({ path: this.homePath })
    },
  },
  persist: {
    key: 'persist-tab',
    storage: window.sessionStorage,
    paths: ['tabList'],
  },
})
