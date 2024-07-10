<template>
  <el-drawer v-model="visible" :title="$t('setting.title')" size="290px">
    <el-divider content-position="center">
      <el-icon><Notification /></el-icon>
      {{ $t('setting.globalTheme') }}
    </el-divider>
    <div class="setting-item">
      <span>{{ $t('setting.themeColor') }}</span>
      <el-color-picker v-model="primary" :predefine="PRIMARY_LIST" @change="updatePrimary" />
    </div>
    <div class="setting-item">
      <span>{{ $t('setting.darkMode') }}</span>
      <SwitchDark />
    </div>
    <div class="setting-item">
      <span>{{ $t('setting.language') }}</span>
      <Language />
    </div>
    <el-divider content-position="center">
      <el-icon><Setting /></el-icon>
      {{ $t('setting.layoutConfig') }}
    </el-divider>
    <div class="setting-item">
      <span>{{ $t('setting.tabsView') }}</span>
      <el-switch v-model="showTabs" :active-text="getSwitchText(showTabs)" />
    </div>
    <div class="setting-item">
      <span>{{ $t('setting.tabsIcon') }}</span>
      <el-switch v-model="showTabsIcon" :active-text="getSwitchText(showTabsIcon)" />
    </div>
    <div class="setting-item">
      <span>{{ $t('setting.pageHeader') }}</span>
      <el-switch v-model="showHeader" :active-text="getSwitchText(showHeader)" />
    </div>
    <div class="setting-item">
      <span>{{ $t('setting.pageFooter') }}</span>
      <el-switch v-model="showFooter" :active-text="getSwitchText(showFooter)" />
    </div>
    <div class="setting-item">
      <span>{{ $t('setting.waterMark') }}</span>
      <el-switch v-model="showWaterMark" :active-text="getSwitchText(showWaterMark)" />
    </div>
    <div class="setting-item">
      <span>{{ $t('setting.componentSize') }}</span>
      <el-select v-model="comSize" style="width: 80px">
        <el-option label="小型" value="small"></el-option>
        <el-option label="中型" value="default"></el-option>
        <el-option label="大型" value="large"></el-option>
      </el-select>
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
import { useAppStore, useUserStore } from '@/store/index'
import { useSetting } from '@/hooks/index'
import { useI18n } from 'vue-i18n'
import { PRIMARY_LIST } from '@/config/index'
import mittBus from '@/utils/mittBus'
import SwitchDark from './SwitchDark.vue'
import Language from './Language.vue'

const { t } = useI18n()
const appStore = useAppStore()
const userStore = useUserStore()
const visible = ref(false)

const { isPreview, primary, comSize, showTabs, showTabsIcon, showHeader, showFooter, showWaterMark } = toRefs(appStore)
const { updatePrimary } = useSetting()

mittBus.on('openSettings', () => (visible.value = true))

//开关的文本内容
const getSwitchText = (value) => {
  return value ? t('setting.show') : t('setting.hide')
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
