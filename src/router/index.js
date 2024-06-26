import { createRouter, createWebHashHistory } from 'vue-router'
import { useAppStore } from '@/store/index'
import { initLayoutRoute } from '@/config/menu'
import nProgress from 'nprogress'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'layout',
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/views/error/403.vue'),
    },
    {
      path: '/500',
      name: '500',
      component: () => import('@/views/error/500.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      name: '404',
      component: () => import('@/views/error/404.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  nProgress.start()
  const appStore = useAppStore()
  //路由初始化
  if (!appStore.layoutRoute) {
    const layoutPath = to.fullPath.indexOf('/preview') === 0 ? '/preview' : '/layout'
    initLayoutRoute(layoutPath)
    return next({ path: to.path, query: to.query, replace: true })
  }
  next()
})

router.afterEach((to) => {
  document.title = to.query.subTitle ? `${to.meta.title} | ${to.query.subTitle}` : to.meta.title
  nProgress.done()
})

export default router
