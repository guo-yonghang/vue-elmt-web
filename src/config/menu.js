import { markRaw } from 'vue'
import { useAppStore, useTabStore } from '@/store/index'
import router from '@/router/index'
import Layout from '@/layout/index.vue'
import menuList from '@/assets/json/menuList.json'
import resultRoutes from '@/assets/json/resultRoutes.json'

const views = import.meta.glob('../views/**/*.vue')

//初始化layout路由
export const initLayoutRoute = () => {
  const appStore = useAppStore()
  const tabStore = useTabStore()
  menuList.push(resultRoutes)
  const defaultChildren = getChilrenRoute(menuList)
  const previewChildren = getChilrenRoute(menuList)
  previewChildren.forEach((item) => {
    item.path = `/preview${item.path}`
    item.name = `/preview${item.name}`
  })
  const children = defaultChildren.concat(previewChildren)
  const layout = {
    path: '/layout',
    name: 'layout',
    component: markRaw(Layout),
    redirect: children[0].name,
    children,
  }
  router.addRoute(layout)
  appStore.layoutRoute = layout
  tabStore.homePath = children[0].path
}

//处理layout的子路由
const getChilrenRoute = (list) => {
  list.sort((a, b) => a.idx - b.idx)
  const res = []
  for (let i = 0, len = list.length; i < len; i++) {
    const { path, name, title, icon = '', type, visible = true, keepAlive = true, showTab = true, needLogin = false, children = [] } = list[i]
    const obj = {
      path,
      name,
      meta: { title: title, icon, type, visible, keepAlive, showTab, needLogin },
    }
    if (type === 2) {
      obj.component = views[`../views${name}/index.vue`]
      res.push(obj)
    }
    if (type === 1 && children.length) {
      res.push(...getChilrenRoute(children))
    }
  }
  return res
}
