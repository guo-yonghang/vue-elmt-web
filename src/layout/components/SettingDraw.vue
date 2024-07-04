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
    <div class="setting-item">
      <span>语言</span>
      <Language />
    </div>
    <div class="setting-item">
      <span>标签栏</span>
      <el-switch v-model="appStore.showTabs" />
    </div>
    <div class="setting-item">
      <span>标签栏图标</span>
      <el-switch v-model="appStore.showTabsIcon" />
    </div>
    <div class="setting-item">
      <span>页头</span>
      <el-switch v-model="appStore.showHeader" />
    </div>
    <div class="setting-item">
      <span>页脚</span>
      <el-switch v-model="appStore.showFooter" />
    </div>
    <div class="setting-item">
      <span>水印</span>
      <el-switch v-model="appStore.showWaterMark" />
    </div>
    <div class="setting-item">
      <span>组件尺寸</span>
      <el-select v-model="appStore.comSize" style="width: 80px">
        <el-option label="小型" value="small"></el-option>
        <el-option label="中型" value="default"></el-option>
        <el-option label="大型" value="large"></el-option>
      </el-select>
    </div>
  </el-drawer>
  <div class="setting-box flxc" @click="visible = true" v-if="!appStore.showHeader">
    <el-icon><Setting /></el-icon>
  </div>
  <div class="watermark-box" v-if="appStore.showWaterMark && !isPreview">
    <el-watermark :width="400" :font="{ color: 'rgba(180,180,180,0.2)' }" :content="WATERMARK_NAME">
      <div style="width: 100vw; height: 100vh"></div>
    </el-watermark>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/index'
import { useSetting } from '@/hooks/index'
import { PRIMARY_LIST, WATERMARK_NAME } from '@/config/index'
import mittBus from '@/utils/mittBus'
import SwitchDark from './SwitchDark.vue'
import Language from './Language.vue'

const route = useRoute()
const appStore = useAppStore()
const visible = ref(false)

const { updatePrimary } = useSetting()

mittBus.on('openSettings', () => (visible.value = true))

//是否预览模式
const isPreview = computed(() => route.path.indexOf('/preview') === 0)
</script>

<style scoped lang="scss">
.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}
.setting-box {
  position: fixed;
  right: 0;
  top: 50%;
  z-index: 1024;
  background-color: var(--el-color-primary);
  color: #fff;
  opacity: 0.7;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.watermark-box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 90000;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
