import { createRouter, createWebHashHistory } from 'vue-router'
import { useAppStore, useTabStore } from '@/store/index'
import { initLayoutRoute } from '@/config/menu'
import nProgress from 'nprogress'
import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'layout',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
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
    const layoutPath = to.path.indexOf('/preview') === 0 ? '/preview' : '/layout'
    initLayoutRoute(layoutPath)
    return next({ path: to.path, query: to.query, replace: true })
  }
  //如果是预览模式不支持跳转
  if (from.fullPath.indexOf('/preview') === 0) {
    ElMessage.warning('预览模式无权限')
    return next({ path: from.path, query: from.query })
  }
  next()
})

router.afterEach((to) => {
  document.title = `${to.meta.title} | 管理系统`
  const tabStore = useTabStore()
  tabStore.addTab(to)
  nProgress.done()
})

export default router
