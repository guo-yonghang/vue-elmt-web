<template>
  <el-container class="layout-container">
    <el-aside :width="width">
      <Aside />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <Main />
      </el-main>
      <el-footer> 2024 © Vue-Elm By 逆境生长. </el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/index'
import Aside from './Aside.vue'
import Header from './Header.vue'
import Main from './Main.vue'

const appStore = useAppStore()

//侧边栏的宽度
const width = computed(() => (appStore.isCollapse ? '65px' : '210px'))
</script>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  height: 100%;

  .el-aside {
    border-right: 1px solid var(--el-border-color);
    overflow: hidden;
    user-select: none;
    transition: width 0.3s ease;
  }

  .el-header {
    height: 55px;
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
</style>
