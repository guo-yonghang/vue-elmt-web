<template>
  <el-switch v-model="appStore.isDark"  @change="updatePrimary" />
</template>

<script setup>
import { useAppStore } from '@/store/index'
import { useSetting } from '@/hooks/index'

const appStore = useAppStore()
const { updatePrimary } = useSetting()
</script>