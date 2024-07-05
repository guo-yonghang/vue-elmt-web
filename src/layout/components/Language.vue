<template>
  <el-radio-group v-model="appStore.language" size="small" @change="updateLanguage">
    <el-radio-button label="中文" value="zh" />
    <el-radio-button label="英文" value="en" />
  </el-radio-group>
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
