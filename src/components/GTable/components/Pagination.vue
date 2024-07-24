<template>
  <el-pagination
    :background="true"
    :current-page="pageable.pageNum"
    :page-size="pageable.pageSize"
    :page-sizes="[10, 25, 50, 100]"
    :total="pageable.total"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></el-pagination>
</template>

<script setup>
defineProps({
  pageable: Object,
  handleSizeChange: {
    type: Function,
    default: () => {},
  },
  handleCurrentChange: {
    type: Function,
    default: () => {},
  },
})
</script>
