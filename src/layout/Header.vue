<template>
  <div class="ful flx jstb alic">
    <el-space>
      <el-button class="fs-22" :icon="appStore.collapse ? 'Expand' : 'Fold'" text size="large" circle @click="onCollapse" />
    </el-space>
    <el-space>
      <SwitchDark />
      <Language />
      <el-button class="fs-22" icon="Setting" text size="large" circle @click="onSettings" />
    </el-space>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store/index'
import mittBus from '@/utils/mittBus'
import SwitchDark from './components/SwitchDark.vue'
import Language from './components/Language.vue'

const appStore = useAppStore()

//折叠展开菜单
const onCollapse = () => {
  appStore.collapse = !appStore.collapse
}

//打开设置抽屉
const onSettings = () => {
  mittBus.emit('openSettings')
}
</script>

<style lang="scss" scoped></style>
