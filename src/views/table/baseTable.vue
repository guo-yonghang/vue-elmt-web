<template>
  <div>
    <el-date-picker></el-date-picker>
    <el-button @click="openWindow">打开新窗口</el-button>
    <el-button @click="openTable">带参数到表格</el-button>
  </div>
</template>

<script setup name="/form/baseTable">
import { useRouter } from 'vue-router'

const router = useRouter()

const openWindow = () => {
  window.open(window.location.origin + '/#/preview/table/superTable?subTitle=你好')
}
const openTable = () => {
  router.push({
    path: '/table/superTable',
    query: {
      subTitle: '用户列表',
    },
  })
}
</script>

<style lang="scss" scoped></style>
