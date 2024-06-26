<template>
  <div class="logo-box flxc">
    <img src="../assets/images/element-plus.org.svg" alt="" />
    <span v-show="!collapse">System</span>
  </div>
  <div class="menu-box">
    <el-scrollbar>
      <el-menu :router="false" :default-active="defaultActive" :collapse="collapse" :unique-opened="true" :collapse-transition="false">
        <SubMenu :menu-list="menuList" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/index'
import SubMenu from './components/SubMenu.vue'
import menuList from '@/assets/json/menuList.json'

const route = useRoute()
const appStore = useAppStore()

//激活的菜单
const defaultActive = computed(() => route.path)

//菜单是否折叠
const collapse = computed(() => appStore.isCollapse)
</script>

<style lang="scss" scoped>
.logo-box {
  width: 100%;
  height: 55px;
  img {
    width: 35px;
    height: 35px;
  }
  span {
    font-size: 18px;
    margin-left: 10px;
    white-space: nowrap;
  }
}

.menu-box {
  height: calc(100% - 55px);
  .el-menu {
    border-right: none;
  }
}
</style>
