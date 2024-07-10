<template>
  <el-dropdown trigger="click" @command="onSelectItem">
    <el-button link plain size="small">
      <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
      <span style="margin: 0 5px">逆境生长</span>
      <el-icon><ArrowDown /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="info">
          <el-icon><User /></el-icon>
          <span>{{ $t('header.infomation') }}</span>
        </el-dropdown-item>
        <el-dropdown-item command="logout">
          <el-icon><SwitchButton /></el-icon>
          <span>{{ $t('header.logout') }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/index'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

//语言变化
const onSelectItem = (value) => {
  if (value === 'info') {
    router.push({ path: '/myself/infomation' })
  }
  if (value === 'logout') {
    ElMessageBox.confirm('确认要退出登录吗？', '温馨提示', { type: 'warning' })
      .then(() => {
        ElMessage.success('已退出')
        userStore.token = ''
        router.replace('/login')
      })
      .catch(() => {})
  }
}
</script>

<style scoped lang="scss">
.el-button {
  padding: 0 5px;
}
</style>
