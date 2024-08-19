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
import { useTabStore } from '@/store'

const tabStore = useTabStore()

//需要缓存的组件名列表
const keepAliveList = computed(() => {
  if (!tabStore.layoutRoute) return []
  return tabStore.tabList.map((item) => item.path.split('/:')[0])
})
</script>

<style lang="scss" scoped></style>
