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
import menuList from '@/assets/json/menuList.json'

//获取所有的缓存的列表
const getKeepAliveNames = (list) => {
  const result = []
  list.forEach((item) => {
    if (item.type === 2) {
      result.push(item)
    }
    if (item.type === 1 && item.children.length) {
      result.push(...getKeepAliveNames(item.children))
    }
  })
  return result
}

//缓存的列表
const keepAliveList = getKeepAliveNames(menuList)
</script>

<style lang="scss" scoped></style>
