<template>
  <!-- 预览模式布局 -->
  <el-watermark :width="200" :font="{ color: 'rgba(180,180,180,0.05)' }" :content="waterMarkText" v-if="isPreview">
    <div class="preview-container">
      <router-view v-slot="{ Component }">
        <transition appear name="fade-transform" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </el-watermark>
  <!-- 常规模式布局 -->
  <el-container class="layout-container" v-else>
    <el-aside :width="width">
      <Aside />
    </el-aside>
    <el-container>
      <el-header @contextmenu="onContextmenu" v-if="showHeader">
        <Header />
      </el-header>
      <el-main>
        <Main />
      </el-main>
      <el-footer v-if="showFooter"> 2024 逆境生长. </el-footer>
    </el-container>
  </el-container>
  <el-config-provider size="default">
    <SettingDraw />
  </el-config-provider>
</template>

<script setup>
import { computed, toRefs } from 'vue'
import { useAppStore, useUserStore } from '@/store/index'
import Aside from './Aside.vue'
import Header from './Header.vue'
import Main from './Main.vue'
import SettingDraw from './components/SettingDraw.vue'

const appStore = useAppStore()
const userStore = useUserStore()

const { showHeader, showFooter, isPreview } = toRefs(appStore)

//侧边栏的宽度
const width = computed(() => (appStore.collapse ? '65px' : '210px'))

//水印内容
const waterMarkText = computed(() => {
  return [userStore.userInfo?.name || '游客', '管理系统']
})

//禁止右键菜单
const onContextmenu = (event) => {
  event.preventDefault()
}
</script>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  height: 100%;

  .el-aside {
    overflow: hidden;
    user-select: none;
    transition: width 0.3s ease;
    border-right: 1px solid var(--el-border-color-light);
  }

  .el-header {
    height: 55px;
    padding: 0;
    background-color: var(--el-header-bg-color);
    border-bottom: 1px solid var(--el-border-color-light);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .el-main {
    overflow-x: hidden;
    padding: 10px 12px;
    background-color: var(--el-bg-color-page);
  }

  .el-footer {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 12px;
    background-color: var(--el-bg-color-page);
  }
}

.preview-container {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  padding: 10px 12px;
  background-color: var(--el-bg-color-page);
}
</style>
