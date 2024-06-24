<template>
  <SearchForm v-if="showSearch" />
  <div class="card table-main">
    <div class="table-header">
      <el-space>
        <el-button>按钮</el-button>
        <slot name="tableHeader" :selected-list="[]" :selected-list-ids="[]" :is-selected="false" />
      </el-space>
      <el-space>
        <slot name="toolButton">
          <el-button v-if="showToolButton('refresh')" :icon="Refresh" circle @click="getTableList" />
          <el-button v-if="showToolButton('setting') && columns.length" :icon="Operation" circle @click="openColSet" />
          <el-button v-if="showToolButton('search') && searchColumns?.length" :icon="Search" circle @click="showSearch = !showSearch" />
        </slot>
      </el-space>
    </div>
    <el-table ref="tableContext" v-bind="$attrs" :data="processTableData" :rowKey="rowKey">
      <!-- 默认插槽 -->
      <slot />
      <!-- 列配置 -->
      <template v-for="item in tableColumns" :key="item">
        <el-table-column v-if="item.type && columnTypes.includes(item.type)" v-bind="item" :align="item.align || 'center'" :reserve-selection="item.type == 'selection'">
          <template #default="scope">
            <!-- expand -->
            <template v-if="item.type === 'expand'">
              <component :is="item.render" v-bind="scope" v-if="item.render" />
              <slot v-else :name="item.type" v-bind="scope" />
            </template>
            <!-- radio -->
            <el-radio v-if="item.type === 'radio'" v-model="radio" :label="scope.row[rowKey]">
              <i></i>
            </el-radio>
            <!-- sort -->
            <el-tag v-if="item.type === 'sort'" class="move">
              <el-icon> <DCaret /></el-icon>
            </el-tag>
          </template>
        </el-table-column>
        <!--其他 -->
        <TableColumn v-if="!item.type && item.prop && item.isShow" :column="item">
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" v-bind="scope" />
          </template>
        </TableColumn>
      </template>
      <!-- 最后一行之后的插槽 -->
      <template #append>
        <slot name="append" />
      </template>
      <template #empty>
        <div class="table-empty">
          <slot name="empty">
            <img src="@/assets/images/notData.png" alt="notData" />
            <div>暂无数据</div>
          </slot>
        </div>
      </template>
    </el-table>
    <!-- 分页组件 -->
    <slot nam="pagination">
      <Pagination v-if="pagination" :pageable="pageable" :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange" />
    </slot>
  </div>
  <ColSetting v-if="showToolButton('setting')" ref="colsetContext" v-model:colset-columns="colsetColumns" />
</template>

<script setup name="SuperTable">
import { ref, reactive, unref, computed, onMounted, provide } from 'vue'
import { Refresh, Operation, Search } from '@element-plus/icons-vue'
import { useTableHook } from './hook/table'
import { properties } from './js/props'
import { handleProp } from './js/util'
import TableColumn from './components/TableColumn.vue'
import Pagination from './components/Pagination.vue'
import SearchForm from '@/components/SearchForm/index.vue'
import ColSetting from './components/ColSetting.vue'
import Sortable from 'sortablejs'

const props = defineProps(properties)
const emits = defineEmits(['search', 'reset', 'dargSort'])

//使用hook函数
const { tableData, pageable, searchParam, searchInitParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } = useTableHook(
  props.requestApi,
  props.initParams,
  props.pagination,
  props.dataCallBack,
  props.requestError,
)

//eltable实例
const tableContext = ref()

//单选选中的rowKey
const radio = ref('')

//是否显示搜索模块
const showSearch = ref(true)

//特殊列配置类型
const columnTypes = ['selection', 'radio', 'index', 'expand', 'sort']

//是否展示toolbutton
const showToolButton = (key) => {
  return Array.isArray(props.toolButton) ? props.toolButton.includes(key) : props.toolButton
}

//表格数据初处理
const processTableData = computed(() => {
  if (!props.data) return tableData.value
  if (!props.pagination) return props.data
  return props.data.slice((pageable.value.pageNum - 1) * pageable.value.pageSize, pageable.value.pageSize * pageable.value.pageNum)
})

//行拖拽排序
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
  props.autoRequest && getTableList()
  props.data && (pageable.value.total = props.data.length)
})

//接收columns设置为响应式
const tableColumns = reactive(props.columns)

//扁平化以便于colSetting
const flatColumns = computed(() => flatColumnsFunc(tableColumns))

//enumMap 存储所有的emnu值
const enumMap = ref(new Map())
const setEnumMap = async ({ prop, enum: enumValue }) => {
  if (!enumValue) return
  if (enumMap.value.has(prop) && (typeof enumValue === 'function' || enumMap.value.get(prop) === enumValue)) return
  if (typeof enumMap !== 'function') return enumMap.value.set(prop, unref(enumValue))
  enumMap.value.set(prop, [])
  const { data } = await enumValue()
  enumMap.value.set(prop, data)
}

provide('enumMap', enumMap)

//扁平化columns数组
const flatColumnsFunc = (columns) => {
  const flatArr = []
  columns.forEach(async (col) => {
    if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children))
    flatArr.push(col)

    // column 添加默认 isShow && isFilterEnum 属性值
    col.isShow = col.isShow || true
    col.isFilterEnum = col.isFilterEnum || true

    // 设置 enumMap
    await setEnumMap(col)
  })
  return flatArr.filter((item) => !item._children?.length)
}

//过滤需要搜索的配置项 && 排序
const searchColumns = computed(() => {
  return flatColumns.value?.filter((item) => item.search?.el || item.search?.render).sort((a, b) => a.search.order - b.search.order)
})

//搜索表单默认排序 && 搜索表单项的默认值
searchColumns.value?.forEach((column, index) => {
  column.search.order = column.search?.order || index + 2
  const key = column.search?.key || handleProp(column.prop)
  const defaultValue = column.search?.defaultValue
  if (defaultValue !== undefined && defaultValue !== null) {
    searchInitParam.value[key] = defaultValue
    searchParam.value[key] = defaultValue
  }
})

console.log('searchColumns', searchColumns)

//列设置相关==>过滤掉不需要的列
const colsetContext = ref()
const colsetColumns = tableColumns.filter((item) => {
  const { type, prop, isShow } = item
  return !columnTypes.includes(type) && prop !== 'operation' && isShow
})
const openColSet = () => colsetContext.value.open()

//搜索
const _search = () => {
  search()
  emits('search')
}

//重置
const _reset = () => {
  reset()
  emits('reset')
}

//清空选中数据列表
const clearSelection = () => tableContext.value.clearSelection()

defineExpose({
  tableContext,
  pageable,
  enumMap,
  radio,
  tableData: processTableData,
})
console.log('ProTable-props', props)
</script>

<style scoped lang="scss"></style>
