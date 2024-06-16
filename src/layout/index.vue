<template>
  <el-container class="layout-container">
    <el-aside width="210px">
      <Aside />
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import Aside from './Aside.vue'
</script>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  height: 100%;

  .el-aside {
    border-right: 1px solid var(--el-border-color);
    user-select: none;
    transition: width 0.3s ease;
  }

  .el-header {
    height: 55px;
  }

  .el-footer {
    height: 40px;
    background-color: #eee;
  }
}
</style>
