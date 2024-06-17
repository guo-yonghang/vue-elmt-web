<template>
  <div>
    <el-table ref="TableContext" v-bind="$attrs" :data="processTableData" :rowKey="rowKey">
      <!-- 默认插槽 -->
      <slot />
      <!-- 列配置 -->
      <template v-for="item in columns" :key="item">
        <el-table-column v-if="item.type && columnTypes.includes(item.type)" v-bind="item" :align="item.align ?? 'center'" :reserve-selection="item.type == 'selection'">
          <template #default="scope">
            <!-- expand -->
            <template v-if="item.type == 'expand'">
              <component :is="item.render" v-bind="scope" v-if="item.render" />
              <slot v-else :name="item.type" v-bind="scope" />
            </template>
            <!-- radio -->
            <el-radio v-if="item.type == 'radio'" v-model="radio" :label="scope.row[rowKey]">
              <i></i>
            </el-radio>
            <!-- sort -->
            <el-tag v-if="item.type == 'sort'" class="move">
              <el-icon> <DCaret /></el-icon>
            </el-tag>
          </template>
        </el-table-column>
        <!--其他 -->
        <TableColumn v-if="!item.type && item.prop" :column="item">
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" v-bind="scope" />
          </template>
        </TableColumn>
      </template>
      <!-- 最后一行之后的插槽 -->
      <template #append>
        <slot name="append" />
      </template>
    </el-table>
  </div>
</template>

<script setup name="SuperTable">
import { ref, computed, onMounted } from 'vue'
import TableColumn from './components/TableColumn.vue'
import properties from './properties'
import Sortable from 'sortablejs'

const props = defineProps(properties)
const emits = defineEmits(['dargSort'])

const columnTypes = ['selection', 'radio', 'index', 'expand', 'sort']

const radio = ref('')

//
const tableData = ref([])
const getTableData = () => {}
const pageable = ref({ total: 10, pageNum: 1, pageSize: 10 })
//

const processTableData = computed(() => {
  if (!props.data) return tableData.value
  return props.data
})

//拖拽排序
const dragSort = () => {
  const tbody = document.querySelector('.el-table__body-wrapper tbody')
  Sortable.create(tbody, {
    handle: '.move',
    animation: 300,
    onEnd({ newIndex, oldIndex }) {
      const [removedItem] = processTableData.value.splice(oldIndex, 1)
      processTableData.value.splice(newIndex, 0, removedItem)
      emits('dargSort', { newIndex, oldIndex })
    },
  })
}

//初始化表格数据 && 拖拽排序
onMounted(() => {
  dragSort()
  props.autoRequest && getTableData()
  props.data && (pageable.value.total = props.data.length)
})

console.log('props', props)
</script>

<style scoped lang="scss"></style>
