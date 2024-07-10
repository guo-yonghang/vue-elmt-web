import { createRouter, createWebHashHistory } from 'vue-router'
import { useAppStore, useUserStore, useTabStore } from '@/store/index'
import { initLayoutRoute } from '@/config/menu'
import { ElMessage } from 'element-plus'
import nProgress from 'nprogress'

let cacheRoute = null

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'layout',
      //layout下的路由有visible、keepAlive、showTab、needLogin的概念，其他的没有
    },
    {
      path: '/login',
      name: 'login',
      meta: { title: '登录' },
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/views/error/403/index.vue'),
    },
    {
      path: '/500',
      name: '500',
      component: () => import('@/views/error/500/index.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      name: '404',
      component: () => import('@/views/error/404/index.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  nProgress.start()
  const appStore = useAppStore()
  const userStore = useUserStore()
  //路由初始化
  if (!appStore.layoutRoute) {
    appStore.isPreview = to.fullPath.indexOf('/preview') === 0
    initLayoutRoute()
    return next({ path: to.fullPath, query: to.query, replace: true })
  }
  //如果是预览模式不支持跳转
  if (from.fullPath.indexOf('/preview') === 0) {
    ElMessage.warning('预览模式无权限')
    return next(from)
  }
  //如果缓存的路由存在，直接重定向到缓存的路由
  if (cacheRoute && userStore.token) {
    next({ ...cacheRoute, replace: true })
    cacheRoute = null
    return
  }
  //如果需要登陆且未登录将未登录的路由缓存先去登录页
  if (to.meta.needLogin && !userStore.token) {
    cacheRoute = to
    return next({ path: '/login' })
  }
  //如果去往的是登录页面且已经有token了则返回
  if (to.fullPath === '/login' && userStore.token) {
    return next(from)
  }
  //如果需要登录且没有菜单权限
  if (to.meta.needLogin && !userStore.authMenuList.includes(to.name)) {
    return next({ path: '/403' })
  }
  next()
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | 管理系统` : '管理系统'
  const tabStore = useTabStore()
  tabStore.addTab(to)
  nProgress.done()
})

export default router
