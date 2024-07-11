<template>
  <div class="echarts full">
    <div class="item" v-for="(item, index) in orderCountList" :key="index">
      <div class="label">{{ item.year }}</div>
      <div class="value flxc">{{ item.value }}</div>
    </div>
  </div>
</template>

<script setup>
const orderCountList = [
  { year: '2019', value: 1359 },
  { year: '2020', value: 2451 },
  { year: '2021', value: 3431 },
  { year: '2022', value: 5352 },
  { year: '2023', value: 6231 },
  { year: '2024', value: 1516 },
]
</script>

<style scoped lang="scss">
.echarts {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 10px 0 10px;

  .item {
    width: calc((100% - 20px) / 3);
    height: calc((100% - 20px) / 2);
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: space-between;
    background-image: linear-gradient(0deg, #cfd9df 0%, #e2ebf0 100%);
    color: var(--el-color-warning);
    border-radius: 6px;
    margin-right: 10px;

    &:nth-of-type(3n) {
      margin-right: 0;
    }

    .label {
      color: #333333;
      font-size: 16px;
      width: 100%;
      padding: 5px 12px;
      font-style: italic;
    }

    .value {
      width: 100%;
      flex: 1;
      padding-bottom: 14px;
      font-size: 32px;
      font-weight: bold;
    }
  }
}

.dark {
  .echarts {
    .item {
      background-image: linear-gradient(-225deg, #4d50f3 0%, #31a2d3 100%);
      color: #fff;
      .label {
        color: #fff;
      }
    }
  }
}
</style>
