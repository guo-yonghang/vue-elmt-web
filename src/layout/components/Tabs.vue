<template>
  <div class="tabs-box" @contextmenu="onContextmenu">
    <el-tabs v-model="tabValue" type="card" @tab-click="onTabClick" @tab-remove="onTabRemove">
      <el-tab-pane v-for="(item, index) in tabStore.tabList" :key="item.path" :label="item.title" :name="item.path" :closable="item.path !== tabStore.homePath">
        <template #label>
          <el-dropdown ref="dropContexts" trigger="contextmenu" @visible-change="onVisibleChange($event, index)">
            <RenderIcon :icon="item.icon" v-if="item.icon && appStore.showTabsIcon" />
            <span :class="{ 'is-active': item.path === tabValue }">{{ item.title }}</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="Refresh">刷新</el-dropdown-item>
                <el-dropdown-item :icon="DArrowLeft">关闭左侧</el-dropdown-item>
                <el-dropdown-item :icon="DArrowRight">关闭右侧</el-dropdown-item>
                <el-dropdown-item :icon="Remove">关闭其他</el-dropdown-item>
                <el-dropdown-item :icon="CircleClose">关闭所有</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="jsx">
import { ref, watch, h, resolveComponent, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Refresh, DArrowLeft, DArrowRight, Remove, CircleClose } from '@element-plus/icons-vue'
import { useAppStore, useTabStore } from '@/store/index'
import Sortable from 'sortablejs'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const tabStore = useTabStore()

const dropContexts = ref()

//标签的值
const tabValue = ref(route.fullPath)

//监听路由
watch(
  () => route.fullPath,
  (newValue) => {
    if (newValue !== tabValue.value) {
      tabValue.value = newValue
    }
  },
)

//禁用tabs右键菜单
const onContextmenu = (event) => {
  event.preventDefault()
}

//下拉菜单显隐变化
const onVisibleChange = (visible, index) => {
  if (!visible) return
  for (let i = 0, len = dropContexts.value.length; i < len; i++) {
    if (i !== index) {
      dropContexts.value[i].handleClose()
    }
  }
}

//点击标签
const onTabClick = ({ props }) => {
  if (tabValue.value === props.name) return
  router.push({ path: props.name })
}

//删除标签
const onTabRemove = () => {}

//渲染图标
const RenderIcon = ({ icon }) => {
  if (!icon) return <></>
  if (icon.includes('http')) return <img src={icon} class="tab-icon" />
  return <el-icon class="tab-icon">{h(resolveComponent(icon))}</el-icon>
}

//拖拽排序
const onTabsDrop = () => {
  Sortable.create(document.querySelector('.el-tabs__nav'), {
    draggable: '.el-tabs__item',
    animation: 300,
    onEnd({ newIndex, oldIndex }) {
      const tabsList = [...tabStore.tabsList]
      const currRow = tabsList.splice(oldIndex, 1)[0]
      tabsList.splice(newIndex, 0, currRow)
      tabStore.tabList = tabsList
    },
  })
}

onMounted(() => {
  onTabsDrop()
})
</script>

<style scoped lang="scss">
.tabs-box {
  background-color: var(--el-bg-color);
  user-select: none;
  :deep(.el-tabs) {
    .el-tabs__header {
      box-sizing: border-box;
      height: 40px;
      margin: 0;
      .el-tabs__nav-wrap {
        .el-tabs__nav {
          display: flex;
          border: none;
          .el-tabs__item {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #afafaf;
            border: none;
            .tab-icon {
              width: 20px;
              margin-right: 4px;
            }
            .is-icon-close {
              margin-top: 1.5px;
            }
            .is-active {
              color: var(--el-color-primary);
            }
            &.is-active {
              color: var(--el-color-primary);
            }
          }
        }
      }
    }
  }
}
</style>
