<template>
  <div class="logo-box flxc">
    <img src="../assets/images/vue.svg" alt="" />
    <span>Vue-Elm</span>
  </div>
  <div class="menu-box">
    <el-scrollbar>
      <el-menu :router="false" :default-active="defaultActive" :collapse="isCollapse" :unique-opened="true" :collapse-transition="true">
        <SubMenu :menu-list="menuList" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import SubMenu from './components/SubMenu.vue'
import menuList from '@/assets/json/menuList.json'

const isCollapse = ref(false)

const route = useRoute()

const defaultActive = computed(() => route.path)
</script>

<style lang="scss" scoped>
.logo-box {
  width: 100%;
  height: 55px;
  img {
    width: 35px;
  }
  span {
    font-size: 18px;
    font-weight: bold;
    margin-left: 10px;
  }
}

.menu-box {
  height: calc(100% - 55px);
  .el-menu {
    border-right: none;
  }
}
</style>
