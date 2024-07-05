<template>
  <el-switch v-model="appStore.isDark" inline-prompt :active-icon="Sunny" :inactive-icon="Moon" @change="onDarkChange" />
</template>

<script setup>
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useAppStore } from '@/store/index'
import { useSetting } from '@/hooks/index'

const appStore = useAppStore()
const { updatePrimary } = useSetting()

//黑夜模式变化
const onDarkChange = (e) => {
  updatePrimary()
}
</script>

<style scoped lang="scss"></style>
