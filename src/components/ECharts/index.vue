<template>
  <div ref="echartsRef" :style="echartsStyle"></div>
</template>

<script setup name="ECharts">
import { ref, computed, watch, nextTick, markRaw, onMounted, onActivated, onBeforeUnmount } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store'
import echarts from './config'

const props = defineProps({
  option: Object,
  renderer: { type: String, default: 'canvas' },
  resize: { type: Boolean, default: true },
  theme: { type: [Object, String], default: '' },
  width: { type: String, default: '' },
  height: { type: String, default: '' },
  onClick: Function,
})

const echartsRef = ref()
const chartInstance = ref()

//图表样式
const echartsStyle = computed(() => {
  const { width, height } = props
  return width || height ? { width: width + 'px', height: height + 'px' } : { width: '100%', height: '100%' }
})

//开始绘制
const draw = () => {
  if (chartInstance.value) {
    chartInstance.value.setOption(props.option, { notMerge: true })
  }
}

watch(props, () => {
  draw()
})

//点击图表
const handleClick = (event) => props.onClick && props.onClick(event)

//初始化
const init = () => {
  if (!echartsRef.value) return
  chartInstance.value = echarts.getInstanceByDom(echartsRef.value)
  if (!chartInstance.value) {
    chartInstance.value = markRaw(echarts.init(echartsRef.value, props.theme, { renderer: props.renderer }))
    chartInstance.value.on('click', handleClick)
    draw()
  }
}

//尺寸变化
const resize = () => {
  if (chartInstance.value && props.resize) {
    chartInstance.value.resize({ animation: { duration: 300 } })
  }
}

//防抖函数处理尺寸变化
const debouncedResize = useDebounceFn(resize, 300, { maxWait: 800 })

//处理layout变化
const appStore = useAppStore()
const { collapse, showHeader, showFooter } = storeToRefs(appStore)

watch(
  () => [collapse, showHeader, showFooter],
  () => {
    debouncedResize()
  },
  { deep: true },
)

onMounted(() => {
  nextTick(() => init())
  window.addEventListener('resize', debouncedResize)
})

onActivated(() => {
  if (chartInstance.value) {
    chartInstance.value.resize()
  }
})

onBeforeUnmount(() => {
  chartInstance.value?.dispose()
  window.removeEventListener('resize', debouncedResize)
})

defineExpose({
  getInstance: () => chartInstance.value,
  resize,
  draw,
})
</script>
