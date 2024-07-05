<template>
  <div class="flxc full">
    <el-button type="primary" @click="onLogin">登录</el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/index'

const router = useRouter()
const userStore = useUserStore()

const onLogin = () => {
  userStore.token = 'xxxxxx'
  router.push({ path: '/layout' })
}
</script>

<style scoped lang="scss"></style>
