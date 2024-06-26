<template>
  <el-dropdown trigger="click" @command="onLanguageChange">
    切换
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh" :disabled="appStore.language === 'zh'"> 简体中文 </el-dropdown-item>
        <el-dropdown-item command="en" :disabled="appStore.language === 'en'"> English </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useAppStore } from '@/store/index'
import { useSetting } from '@/hooks/index'

const appStore = useAppStore()
const { updateLanguage } = useSetting()

//语言变化
const onLanguageChange = (e) => {
  appStore.language = e
  updateLanguage()
}
</script>

<style scoped lang="scss"></style>
