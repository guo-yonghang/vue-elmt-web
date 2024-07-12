<template>
  <div class="full no-card">
    <SuperTable :data="tableData" :columns="columns" stripe :auto-request="false" :tool-button="[]" :pagination="false">
      <template #operation="{ row }">
        <el-button type="primary" link>查看</el-button>
      </template>
    </SuperTable>
  </div>
</template>

<script setup>
import SuperTable from '@/components/SuperTable/index.vue'

//列配置
const columns = [
  {
    prop: 'fileType',
    label: '文件类型',
    enum: [
      { label: '文件', value: 1 },
      { label: '视频', value: 2 },
    ],
  },
  { prop: 'fileName', label: '文件名称' },
  { prop: 'email', label: '邮箱' },
  { prop: 'progress', label: '完成情况' },
  { prop: 'operation', label: '操作', fixed: 'right', width: 80 },
]

//表格数据
const tableData = [
  {
    id: '253622506765466365',
    fileType: 1,
    email: 'n.sphpu@vtkxtcw.kz',
    fileName: '河南地区用户洪水补贴表',
    progress: '3/10',
  },
  {
    id: '414122506765466365',
    fileType: 1,
    email: 'n.sphpu@vtkxtcw.kz',
    fileName: '关于用户影像缺失的补充提议',
    progress: '1/6',
  },
  {
    id: '51254122506765466365',
    fileType: 2,
    email: 'n.sphpu@vtkxtcw.kz',
    fileName: '7月活动现场视频',
    progress: '0/1',
  },
]
</script>
