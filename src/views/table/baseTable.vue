<template>
  <div>
    <el-date-picker></el-date-picker>
    <el-button @click="openWindow">打开新窗口</el-button>
  </div>
</template>

<script setup>
const openWindow = () => {
  window.open('http://localhost:5173/#/preview/table/superTable')
}
</script>

<style lang="scss" scoped></style>
