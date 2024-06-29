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
import { useTabStore } from '@/store/index'

const tabStore = useTabStore()

//缓存组件列表
const keepAliveList = computed(() => tabStore.tabList.map((item) => item.path))
</script>

<style lang="scss" scoped></style>
