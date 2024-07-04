<template>
  <el-switch v-model="appStore.language" inline-prompt inactive-value="zh" active-value="en" inactive-text="英" active-text="中" @change="updateLanguage" />
</template>

<script setup>
import { useAppStore } from '@/store/index'
import { useSetting } from '@/hooks/index'

const appStore = useAppStore()
const { updateLanguage } = useSetting()
</script>

<style scoped lang="scss">
.language-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
