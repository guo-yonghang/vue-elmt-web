<template>
  <el-upload></el-upload>
</template>

<script setup>
import { ref, watch, inject } from 'vue'
import { ElNotification, formContextKey, formItemContextKey } from 'element-plus'

const props = defineProps({
  fileList: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false },
  drag: { type: Boolean, default: true },
  limit: { type: Number, default: 5 },
  fileSize: { type: Number, default: 5 },
  accept: { type: String, default: '' },
  width: { type: String, default: '150px' },
  height: { type: String, default: '150px' },
  borderRadius: { type: String, default: '8px' },
})

const emits = defineEmits(['update:fileList'])

//表单的实例
const formContext = inject(formContextKey, void 0)

//是否禁用
</script>

<style scoped lang="scss"></style>
