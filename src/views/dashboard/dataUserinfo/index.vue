<template>
  <div>
    <el-row :gutter="12">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-card header="用户数量变化">
          <div class="card-item">
            <UserYearCount />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-card header="用户设备来源">
          <div class="card-item">
            <UserPlatSource />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-card header="订单数量变化">
          <div class="card-item">
            <OrderYearCount />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-card header="用户注册来源">
          <div class="card-item">
            <UserRegSource />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-card header="用户支付金额">
          <div class="card-item">
            <UserPayAmt />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-card header="用户相关待办文件">
          <div class="card-item">
            <UserDosthFile />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="/dashboard/dataUserinfo">
import UserYearCount from './components/userYearCount.vue'
import UserPlatSource from './components/userPlatSource.vue'
import OrderYearCount from './components/orderYearCount.vue'
import UserRegSource from './components/userRegSource.vue'
import UserPayAmt from './components/userPayAmt.vue'
import UserDosthFile from './components/userDosthFile.vue'
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

.el-col {
  margin-bottom: 10px;
}
.card-item {
  height: 350px;
}
</style>
