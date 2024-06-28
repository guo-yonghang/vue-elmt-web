<template>
  <div class="preview-container" v-if="isPreview">
    <router-view v-slot="{ Component }">
      <transition appear name="fade-transform" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <el-container class="layout-container" v-else>
    <el-aside :width="width">
      <Aside />
    </el-aside>
    <el-container>
      <el-header @contextmenu="onContextmenu">
        <Header />
      </el-header>
      <Tabs />
      <el-main>
        <Main />
      </el-main>
      <el-footer v-if="showFooter"> 2024 © Vue-Elm By 逆境生长. </el-footer>
    </el-container>
  </el-container>
  <SettingDraw />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/index'
import Aside from './Aside.vue'
import Header from './Header.vue'
import Main from './Main.vue'
import Tabs from './components/Tabs.vue'
import SettingDraw from './components/SettingDraw.vue'

const route = useRoute()
const appStore = useAppStore()

//是否预览模式
const isPreview = computed(() => route.fullPath.indexOf('/preview') === 0)

//是否展示footer
const showFooter = computed(() => appStore.showFooter)

//侧边栏的宽度
const width = computed(() => (appStore.collapse ? '65px' : '210px'))

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
    background-color: var(--el-header-bg-color);
    border-bottom: 1px solid var(--el-border-color-light);
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
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  padding: 10px 12px;
  background-color: var(--el-bg-color-page);
}
</style>
