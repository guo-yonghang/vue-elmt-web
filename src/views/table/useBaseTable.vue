<template>
  <div>
    <el-button @click="openWindow">预览模式</el-button>
  </div>
</template>

<script setup name="/table/useBaseTable">
const openWindow = () => {
  window.open(window.location.origin + '/#/preview/table/useSuperTable')
}
</script>

<style lang="scss" scoped></style>
