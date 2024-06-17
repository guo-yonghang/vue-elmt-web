<template>
  <el-config-provider :locale="locale" :size="size" :message="{ max: 3 }">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/index'
import { useSetting } from '@/hooks/useSetting'

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

const appStore = useAppStore()
const { updatePrimary, updateLanguage } = useSetting()

//初始化
updatePrimary()
updateLanguage()

//语言
const locale = computed(() => (appStore.language === 'zh' ? zhCn : en))

//组件大小
const size = computed(() => appStore.comSize)
</script>

<style scoped lang="scss"></style>
