<template>
  <div>
    <el-card shadow="never">
      <div class="top-title">访客数据</div>
      <el-tabs v-model="tabIndex">
        <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
      </el-tabs>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" style="margin-top: 20px">
          <div class="item-left sle">
            <span class="left-title">访问总数</span>
            <div class="img-box">
              <img src="./images/book-sum.png" alt="" />
            </div>
            <span class="left-number">88.12w</span>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="margin-top: 20px">
          <div class="item-center">
            <div class="gitee-traffic traffic-box">
              <div class="traffic-img">
                <img src="./images/add_person.png" alt="" />
              </div>
              <span class="item-value">2222</span>
              <span class="traffic-name sle">移动端 访问量</span>
            </div>
            <div class="gitHub-traffic traffic-box">
              <div class="traffic-img">
                <img src="./images/add_team.png" alt="" />
              </div>
              <span class="item-value">2222</span>
              <span class="traffic-name sle">PC端 访问量</span>
            </div>
            <div class="today-traffic traffic-box">
              <div class="traffic-img">
                <img src="./images/today.png" alt="" />
              </div>
              <span class="item-value">4567</span>
              <span class="traffic-name sle">今日访问量</span>
            </div>
            <div class="yesterday-traffic traffic-box">
              <div class="traffic-img">
                <img src="./images/book_sum.png" alt="" />
              </div>
              <span class="item-value">1234</span>
              <span class="traffic-name sle">昨日访问量</span>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10" style="margin-top: 20px">
          <div class="item-right">
            <div class="echarts-title">移动端 / PC端 访问量占比</div>
            <div class="book-echarts">
              <Pie />
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="never" style="margin-top: 10px">
      <div class="top-title">数据来源</div>
      <el-tabs v-model="tabIndex" class="demo-tabs">
        <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
      </el-tabs>
      <div class="curve-echarts">
        <Curve ref="curveRef" />
      </div>
    </el-card>
  </div>
</template>

<script setup name="/dashboard/dataAccess">
import { ref } from 'vue'
import Pie from './components/pie.vue'
import Curve from './components/curve.vue'

const tabIndex = ref(1)

const tabs = [
  { label: '今日', name: 1 },
  { label: '近七日', name: 2 },
  { label: '近一月', name: 3 },
  { label: '近三月', name: 4 },
  { label: '近半年', name: 5 },
  { label: '近一年', name: 6 },
]
</script>

<style scoped lang="scss">
//顶部标题
.top-title {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

//左侧区域
.item-left {
  box-sizing: border-box;
  height: 100%;
  padding: 40px 0 30px 30px;
  overflow: hidden;
  color: #ffffff;
  background-image: url('./images/book-bg.png');
  background-position: 50%;
  background-size: cover;
  border-radius: 20px;

  .left-title {
    font-size: 20px;
  }

  .img-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 90px;
    margin: 40px 0 20px;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0 10px 20px rgb(0 0 0 / 14%);

    img {
      width: 60px;
      height: 65px;
    }
  }

  .left-number {
    overflow: hidden;
    font-size: 52px;
  }
}

//中间区域
.item-center {
  display: flex;
  flex-wrap: wrap;
  place-content: space-between space-between;
  height: 100%;

  .traffic-box {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 47%;
    height: 48%;
    padding: 25px;
    border-radius: 30px;

    .traffic-img {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70px;
      height: 70px;
      margin-bottom: 10px;
      background-color: #ffffff;
      border-radius: 19px;
    }
  }

  img {
    width: 33px;
    height: 33px;
  }

  .item-value {
    margin-bottom: 4px;
    font-size: 28px;
    font-weight: bold;
    color: #1a1a37;
  }

  .traffic-name {
    overflow: hidden;
    font-size: 15px;
    color: #1a1a37;
    white-space: nowrap;
  }

  .gitee-traffic {
    background-image: url('./images/1-bg.png');
    background-color: #e8faea;
    background-size: 100% 100%;
  }

  .gitHub-traffic {
    background-image: url('./images/2-bg.png');
    background-color: #e7e1fb;
    background-size: 100% 100%;
  }

  .today-traffic {
    background-image: url('./images/3-bg.png');
    background-color: #fdf3e9;
    background-size: 100% 100%;
  }

  .yesterday-traffic {
    background-image: url('./images/4-bg.png');
    background-color: #f0f5fb;
    background-size: 100% 100%;
  }
}

//右侧区域
.item-right {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 430px;
  border: 1px solid var(--el-border-color);
  border-radius: 25px;

  .echarts-title {
    padding: 15px 20px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid var(--el-border-color);
  }

  .book-echarts {
    flex: 1;
    width: 100%;
  }
}

.curve-echarts {
  box-sizing: border-box;
  height: 400px;
  padding: 0 50px;
}
</style>
