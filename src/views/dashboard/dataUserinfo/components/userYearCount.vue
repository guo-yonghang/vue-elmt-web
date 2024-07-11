<template>
  <div class="echarts full">
    <ECharts :option="option" />
  </div>
</template>

<script setup>
import * as echarts from 'echarts/core'
import ECharts from '@/components/ECharts/index.vue'

const xData = ['2019', '2020', '2021', '2022', '2023', '2024']

const serieData = [50000, 61000, 69000, 80301, 90666, 105532]

const option = {
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    data: xData,
    axisTick: {
      show: false,
    },
    z: 10,
  },
  yAxis: {
    axisLine: {
      show: true,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: '#999',
    },
  },
  legend: {
    show: true,
  },
  tooltip: {
    trigger: 'axis',
  },
  series: [
    {
      name: '人数',
      stack: 'Total',
      type: 'bar',
      showBackground: false,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' },
        ]),
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2378f7' },
            { offset: 0.7, color: '#2378f7' },
            { offset: 1, color: '#83bff6' },
          ]),
        },
      },
      label: {
        show: true,
        position: 'top',
        valueAnimation: true,
      },
      data: serieData,
    },
  ],
}
</script>
