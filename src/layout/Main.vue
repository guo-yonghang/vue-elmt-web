<template>
  <router-view v-slot="{ Component }">
    <transition appear name="fade-transform" mode="out-in">
      <keep-alive :include="keepAliveList">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/store'

const appStore = useAppStore()

//需要缓存的组件名列表
const keepAliveList = computed(() => {
  if (!appStore.layoutRoute) return []
  return getKeepAliveNames(appStore.layoutRoute?.children)
})

//获取所有的缓存的列表
const getKeepAliveNames = (list) => {
  const result = []
  list.forEach((item) => {
    if (item.meta?.type === 2 && item.meta?.keepAlive) {
      result.push(item.name)
    }
    if (item.meta?.type !== 2 && item.children.length) {
      result.push(...getKeepAliveNames(item.children))
    }
  })
  return result
}
</script>

<style lang="scss" scoped></style>
