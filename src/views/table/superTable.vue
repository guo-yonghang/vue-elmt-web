<template>
  <div>
    <SuperTable :data="tableData" :columns="tableColumn" stripe />
  </div>
</template>

<script setup lang="jsx">
import { ElButton } from 'element-plus'
import SuperTable from '@/components/SuperTable/index.vue'

const tableColumn = [
  { type: 'selection', fixed: 'left', width: 70 },
  { type: 'sort', label: 'Sort', width: 80 },
  { type: 'expand', label: 'Expand', width: 85 },
  {
    prop: 'date',
    label: 'Date',
    width: 150,
    fixed: 'left',
  },
  {
    prop: 'name',
    label: 'Name',
    width: 120,
  },
  {
    prop: 'state',
    label: 'State',
    width: 120,
  },
  {
    prop: 'city',
    label: 'City',
    width: 120,
  },
  {
    prop: 'address',
    label: 'Address',
    width: 600,
  },
  {
    prop: 'zip',
    label: 'Zip',
    width: 120,
  },
  {
    label: 'Operations',
    width: 120,
    fixed: 'right',
    render: () => {
      return (
        <>
          <ElButton link type="primary" size="small">
            Detail
          </ElButton>
          <ElButton link type="primary" size="small">
            Edit
          </ElButton>
        </>
      )
    },
  },
]
const tableData = [
  {
    id: 'xvasx1',
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    id: 'xvasx2',
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    id: 'xvasx3',
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    id: 'xvasx4',
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]
</script>

<style lang="scss" scoped></style>
