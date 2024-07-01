<template>
  <Tabs />
  <div class="oprate-box">
    <el-space>
      <Language />
      <el-button class="fs-22" icon="Setting" text circle @click="onSettings" />
      <UserContent />
    </el-space>
  </div>
</template>

<script setup>
import mittBus from '@/utils/mittBus'
import Language from './components/Language.vue'
import Tabs from './components/Tabs.vue'
import UserContent from './components/UserContent.vue'

//打开设置抽屉
const onSettings = () => {
  mittBus.emit('openSettings')
}
</script>

<style lang="scss" scoped>
.oprate-box {
  padding: 0 15px;
}
</style>
