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
          <span>我的信息</span>
        </el-dropdown-item>
        <el-dropdown-item command="logout">
          <el-icon><SwitchButton /></el-icon>
          <span>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/index'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const appStore = useAppStore()

//语言变化
const onSelectItem = (value) => {
  if (value === 'info') {
    router.push({ path: '/myself/infomation' })
  } else {
    console.log('退出登录')
    ElMessageBox.confirm('确认要退出登录吗？', '温馨提示', { type: 'warning' }).then(() => {
      ElMessage.success('已退出')
    })
  }
}
</script>

<style scoped lang="scss">
.el-button {
  padding: 0 5px;
}
</style>
