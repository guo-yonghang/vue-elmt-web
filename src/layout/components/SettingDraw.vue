<template>
  <el-drawer v-model="visible" title="布局设置" size="290px">
    <el-divider content-position="center">
      <el-icon><Notification /></el-icon>
      全局主题
    </el-divider>
    <div class="setting-item">
      <span>主题颜色</span>
      <el-color-picker v-model="primary" :predefine="PRIMARY_LIST" @change="updatePrimary" />
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
      <span>标签栏</span>
      <el-switch v-model="showTabs" :active-text="getSwitchText(showTabs)" />
    </div>
    <div class="setting-item">
      <span>标签栏图标</span>
      <el-switch v-model="showTabsIcon" :active-text="getSwitchText(showTabsIcon)" />
    </div>
    <div class="setting-item">
      <span>页头</span>
      <el-switch v-model="showHeader" :active-text="getSwitchText(showHeader)" />
    </div>
    <div class="setting-item">
      <span>页脚</span>
      <el-switch v-model="showFooter" :active-text="getSwitchText(showFooter)" />
    </div>
    <div class="setting-item">
      <span>水印</span>
      <el-switch v-model="showWaterMark" :active-text="getSwitchText(showWaterMark)" />
    </div>
    <div class="setting-item">
      <span>语言</span>
      <Language />
    </div>
    <div class="setting-item">
      <span>组件尺寸</span>
      <el-radio-group v-model="comSize" size="small">
        <el-radio-button label="小型" value="small"></el-radio-button>
        <el-radio-button label="中型" value="default"></el-radio-button>
        <el-radio-button label="大型" value="large"></el-radio-button>
      </el-radio-group>
    </div>
  </el-drawer>
  <div class="setting-box flxc" @click="visible = true" v-if="!showHeader || isPreview">
    <el-icon><Setting /></el-icon>
  </div>
  <div class="watermark-box" v-if="showWaterMark && !isPreview">
    <el-watermark :width="400" :font="{ color: 'rgba(180,180,180,0.2)' }" :content="waterMarkText">
      <div style="width: 100vw; height: 100vh"></div>
    </el-watermark>
  </div>
</template>

<script setup>
import { ref, computed, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore, useUserStore } from '@/store/index'
import { useSetting } from '@/hooks/index'
import { PRIMARY_LIST } from '@/config/index'
import mittBus from '@/utils/mittBus'
import SwitchDark from './SwitchDark.vue'
import Language from './Language.vue'

const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()
const visible = ref(false)

const { isPreview, primary, comSize, showTabs, showTabsIcon, showHeader, showFooter, showWaterMark } = toRefs(appStore)
const { updatePrimary } = useSetting()

mittBus.on('openSettings', () => (visible.value = true))

//开关的文本内容
const getSwitchText = (value) => {
  return value ? '显示' : '隐藏'
}

//水印内容
const waterMarkText = computed(() => {
  return [userStore.userInfo?.name || '游客', '管理系统']
})
</script>

<style scoped lang="scss">
.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
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
