<template>
  <div class="echarts full">
    <ECharts :option="option" />
  </div>
</template>

<script setup name="cure">
import { useAppStore } from '@/store/index.js'
import ECharts from '@/components/ECharts/index.vue'

const appStore = useAppStore()

const xData = ['掘金', 'CSDN', 'Gitee', 'GitHub', '知乎', 'MyBlog', '简书', 'StackOverFlow', '博客园']

const serieData = [30, { value: 90, itemStyle: { color: appStore.primary } }, 10, 70, 20, 60, 55, 80, 50]

const option = {
  xAxis: {
    type: 'category',
    data: xData,
  },
  yAxis: {},
  grid: {
    left: '0',
    right: '0',
    top: '0',
    bottom: '5%',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  series: [
    {
      type: 'bar',
      barWidth: '42px',
      itemStyle: {
        color: '#1890FF',
        borderRadius: [14, 14, 0, 0],
      },
      label: {
        show: true,
        position: 'top',
      },
      data: serieData,
    },
  ],
}
</script>
