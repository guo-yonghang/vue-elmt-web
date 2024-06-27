<template>
  <el-drawer v-model="visible" title="布局设置" size="290px">
    <el-divider content-position="center">
      <el-icon><Notification /></el-icon>
      全局主题
    </el-divider>
    <div class="setting-item">
      <span>主题颜色</span>
      <el-color-picker v-model="appStore.primary" :predefine="PRIMARY_LIST" @change="updatePrimary" />
    </div>
    <div class="setting-item">
      <span>暗黑模式</span>
      <SwitchDark />
    </div>
    <el-divider content-position="center">
      <el-icon><Setting /></el-icon>
      界面设置
    </el-divider>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/store/index'
import { useSetting } from '@/hooks/index'
import { PRIMARY_LIST } from '@/config/index'
import mittBus from '@/utils/mittBus'
import SwitchDark from './SwitchDark.vue'

const appStore = useAppStore()
const visible = ref(false)

const { updatePrimary } = useSetting()

mittBus.on('openSettings', () => (visible.value = true))
</script>

<style scoped lang="scss">
.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 10px 0;
}
</style>
