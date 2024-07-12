<template>
  <div class="echarts full">
    <ECharts :option="option" />
  </div>
</template>

<script setup>
import ECharts from '@/components/ECharts/index.vue'

const option = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    textStyle: {
      color: '#767676',
    },
  },
  series: [
    {
      name: '消费金额',
      type: 'pie',
      radius: '50%',
      center: ['50%', '55%'],
      data: [
        { value: 1048, name: '50元以下' },
        { value: 735, name: '50元-100元' },
        { value: 580, name: '100元-200元' },
        { value: 484, name: '200元-1000元' },
        { value: 300, name: '1000元以上' },
      ],
    },
  ],
}
</script>