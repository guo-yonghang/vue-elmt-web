<template>
  <el-dropdown trigger="click" @command="onLanguageChange">
    <el-button>
      <template #icon>
        <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
      </template>
      <span>逆境生长</span>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="info"> 用户信息 </el-dropdown-item>
        <el-dropdown-item command="logout"> 退出登录 </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useAppStore } from '@/store/index'
import { useSetting } from '@/hooks/index'

const appStore = useAppStore()
const { updateLanguage } = useSetting()

//语言变化
const onLanguageChange = (value) => {
  appStore.language = value
  updateLanguage()
}
</script>

<style scoped lang="scss">
.language-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
