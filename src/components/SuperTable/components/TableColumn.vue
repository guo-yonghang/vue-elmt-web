<template>
  <RenderTableColumn v-bind="column" />
</template>

<script setup lang="jsx" name="TableColumn">
import { inject, ref, useSlots } from 'vue'

const RenderTableColumn = (item) => {
  return (
    <>
      <el-table-column {...item} align={item.align ?? 'center'} showOverflowTooltip={item.showOverflowTooltip ?? item.prop !== 'operation'}></el-table-column>
    </>
  )
}
</script>

<style scoped lang="scss"></style>
