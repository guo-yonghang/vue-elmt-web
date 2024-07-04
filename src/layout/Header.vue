<template>
  <Tabs />
  <div class="oprate-box">
    <el-space>
      <el-button class="fs-22" icon="Setting" text circle @click="onSettings" />
      <UserContent />
    </el-space>
  </div>
</template>

<script setup>
import mittBus from '@/utils/mittBus'
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
