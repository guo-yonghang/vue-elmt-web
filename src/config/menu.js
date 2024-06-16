import { markRaw } from 'vue'
import { useAppStore } from '@/store/index'
import router from '@/router/index'
import Layout from '@/layout/index.vue'
import menuList from '@/assets/json/menuList.json'
import resultRoutes from '@/assets/json/resultRoutes.json'

// const views = import.meta.glob('../views/**/*.vue', { eager: true, import: 'default' })
const views = import.meta.glob('../views/**/*.vue')

//初始化layout路由
export const initLayoutRoute = () => {
  const appStore = useAppStore()
  const children = getLayoutChilren(menuList.concat(resultRoutes))
  console.log(children)
  const layout = {
    path: '/layout',
    name: 'layout',
    component: markRaw(Layout),
    redirect: children[0].name,
    children,
  }
  console.log('layouts', layout)
  router.addRoute(layout)
  appStore.layoutRoute = layout
}

//处理layout的子路由
const getLayoutChilren = (list) => {
  list.sort((a, b) => a.idx - b.idx)
  const res = []
  for (let i = 0, len = list.length; i < len; i++) {
    const { path, name, title, icon = '', type, visible = true, keepAlive = true, children = [] } = list[i]
    const obj = {
      path,
      name,
      meta: { title: title, enTitle: name, icon, type, visible, keepAlive },
    }
    if (type === 2) {
      obj.component = views[`../views${path}.vue`]
      res.push(obj)
    }
    if (type === 1 && children.length) {
      const objs = getLayoutChilren(children)
      res.push(...objs)
    }
  }
  return res
}
