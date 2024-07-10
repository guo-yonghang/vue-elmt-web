<template>
  <el-switch v-model="appStore.language" inactive-value="zh" active-value="en" :active-text="activeText" @change="updateLanguage" />
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/index'
import { useSetting } from '@/hooks/index'

const appStore = useAppStore()
const { updateLanguage } = useSetting()

//文字内容
const activeText = computed(() => {
  return appStore.language === 'zh' ? '中文' : 'enUs'
})
</script>

<style scoped lang="scss">
.language-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
