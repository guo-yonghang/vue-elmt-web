<template>
  <div>
    <el-row :gutter="12">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-card header="用户数量年度变化">
          <div class="card-item">
            <UserYearCount />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-card header="用户来源年度变化">
          <div class="card-item">
            <UserYearSource />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-card header="订单数量年度变化">
          <div class="card-item">
            <OrderYearCount />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="/dashboard/dataUserinfo">
import UserYearCount from './components/userYearCount.vue'
import UserYearSource from './components/userYearSource.vue'
import OrderYearCount from './components/orderYearCount.vue'
</script>

<style scoped lang="scss">
:deep(.el-card) {
  .el-card__header {
    padding: 12px 15px;
    font-weight: bold;
    font-size: 18px;
  }

  .el-card__body {
    padding: 0;
  }
}

.card-item {
  height: 330px;
}
</style>
