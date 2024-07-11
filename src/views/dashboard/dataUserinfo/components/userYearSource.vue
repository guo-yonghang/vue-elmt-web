<template>
  <div class="echarts full">
    <ECharts :option="option" />
  </div>
</template>

<script setup>
import ECharts from '@/components/ECharts/index.vue'

const xData = ['2019', '2020', '2021', '2022', '2023', '2024']

const phData = [5234, 6563, 7343, 12222, 14642, 18251]

const pcData = [1256, 4124, 5241, 5435, 3019, 10000]

const option = {
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderColor: 'transparent',
    textStyle: {
      color: '#ffffff',
    },
  },
  legend: {
    data: ['移动端人数', 'PC端人数'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: xData,
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '移动端人数',
      type: 'line',
      data: phData,
    },
    {
      name: 'PC端人数',
      type: 'line',
      data: pcData,
    },
  ],
}
</script>
