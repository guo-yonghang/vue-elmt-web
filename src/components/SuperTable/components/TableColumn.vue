<template>
  <RenderTableColumn v-bind="column" />
</template>

<script setup lang="jsx" name="TableColumn">
import { inject, ref, useSlots } from 'vue'
import { handleProp, filterEnum, formatValue, handleRowAccordingToProp } from '../common/util'

/**
 * columnType:
 * type 列类型
 * tag 是否标签展示
 * search 搜索项配置
 * enum 枚举字典
 * isFilterEnum
 * fieldNames: 指定 label && value && children 的 key 值
 * headerRender  自定义表头内容渲染（jsx语法）
 * render 自定义单元格内容渲染（jsx语法）
 * _children 多级表头
 */
defineProps({
  column: {
    type: Object,
    default: () => {},
  },
})

const slots = useSlots()

const enumMap = inject('enumMap', ref(new Map()))

//根据emun和cellVal获取cell要渲染的内容
const renderCellData = (item, scope) => {
  return enumMap.value.get(item.prop) && item.isFilterEnum
    ? filterEnum(handleRowAccordingToProp(scope.row, item.prop), enumMap.value.get(item.prop), item.fieldNames)
    : formatValue(handleRowAccordingToProp(scope.row, item.prop))
}

//tag===true时根据enum和cellVal获取标签的类型
const getTagType = (item, scope) => {
  return filterEnum(handleRowAccordingToProp(scope.row, item.prop), enumMap.value.get(item.prop), item.fieldNames, 'tag') || 'primary'
}

const RenderTableColumn = (item) => {
  return (
    <>
      {item.isShow && (
        <el-table-column {...item} align={item.align ?? 'center'} showOverflowTooltip={item.showOverflowTooltip ?? item.prop !== 'operation'}>
          {{
            default: (scope) => {
              if (item._children) return item._children.map((child) => RenderTableColumn(child))
              if (item.render) return item.render(scope)
              if (slots[handleProp(item.prop)]) return slots[handleProp(item.prop)](scope)
              if (item.tag) return <el-tag type={getTagType(item, scope)}>{renderCellData(item, scope)}</el-tag>
              return renderCellData(item, scope)
            },
            header: (scope) => {
              if (item.headerRender) return item.headerRender(scope)
              if (slots[`${handleProp(item.prop)}Header`]) return slots[`${handleProp(item.prop)}Header`](scope)
              return item.label
            },
          }}
        </el-table-column>
      )}
    </>
  )
}
</script>
