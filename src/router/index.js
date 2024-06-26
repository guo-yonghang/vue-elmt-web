import { createRouter, createWebHashHistory } from 'vue-router'
import { useAppStore } from '@/store/index'
import { initLayoutRoute, initPreviewRoute } from '@/config/menu'
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
  const isPreview = to.fullPath.includes('/preview')
  if (isPreview && !appStore.previewRoute) {
    initPreviewRoute()
    return next({ path: to.path, replace: true })
  }
  if (!isPreview && !appStore.layoutRoute) {
    initLayoutRoute()
    return next({ path: to.path, replace: true })
  }
  next()
})

router.afterEach((to) => {
  document.title = to.meta.subTitle ? `${to.meta.title} | ${to.meta.subTitle}` : to.meta.title
  nProgress.done()
})

export default router
