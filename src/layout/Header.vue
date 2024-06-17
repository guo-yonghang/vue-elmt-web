<template>
  <div class="ful flx jstb alic">
    <el-space>
      <el-button class="fs-22" :icon="appStore.isCollapse ? 'Expand' : 'Fold'" text size="large" circle @click="onCollapse" />
    </el-space>
    <el-space>
      <SwitchDark />
      <Language />
      <span>nihao</span>
    </el-space>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store/index'
import SwitchDark from './components/SwitchDark.vue'
import Language from './components/Language.vue'

const appStore = useAppStore()

const onCollapse = () => {
  appStore.isCollapse = !appStore.isCollapse
}
</script>

<style lang="scss" scoped></style>
