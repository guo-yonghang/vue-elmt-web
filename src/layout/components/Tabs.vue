<template>
  <div class="tabs-box" @contextmenu="onContextmenu">
    <el-tabs v-model="tabValue" type="card" @tab-click="onTabClick" @tab-remove="onTabRemove">
      <el-tab-pane v-for="(item, index) in tabStore.tabList" :key="item.path" :label="item.title" :name="item.path" :closable="item.path !== tabStore.homePath">
        <template #label>
          <el-dropdown ref="dropContexts" trigger="contextmenu" @visible-change="onVisibleChange($event, index)">
            <div :class="['el-dropdown_content', { 'is-active': item.path === tabValue }]">
              <RenderIcon :icon="item.icon" v-if="item.icon && appStore.showTabsIcon" />
              <span>{{ getTitle(item) }}</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="Refresh" @click="onRefresh(index)" v-if="item.path === tabValue">
                  {{ $t('tabs.refresh') }}
                </el-dropdown-item>
                <el-dropdown-item :icon="DArrowLeft" @click="tabStore.delTabLeft(index)" v-if="index > 0">
                  {{ $t('tabs.closeLeft') }}
                </el-dropdown-item>
                <el-dropdown-item :icon="DArrowRight" @click="tabStore.delTabRight(index, tabValue)" v-if="index < tabStore.tabList.length - 1">{{ $t('tabs.closeRight') }} </el-dropdown-item>
                <el-dropdown-item :icon="Remove" @click="tabStore.delTabOther(index)">{{ $t('tabs.closeOther') }} </el-dropdown-item>
                <el-dropdown-item :icon="CircleClose" @click="tabStore.delTabAll">{{ $t('tabs.closeAll') }} </el-dropdown-item>
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
import SvgIcon from '@/components/SvgIcon/index.vue'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const tabStore = useTabStore()

const dropContexts = ref()

//标签的值
const tabValue = ref(route.path)

//监听路由
watch(
  () => route.path,
  (newValue) => {
    if (newValue !== tabValue.value) {
      tabValue.value = newValue
    }
  },
)

//菜单项标题
const getTitle = ({ path, title }) => {
  return appStore.language === 'zh' ? title : path.split('\/').pop()
}

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
const onTabRemove = (path) => {
  tabStore.delTab(path, path === tabValue.value)
}

//刷新标签
const onRefresh = (index) => {
  router.go(0)
}

//渲染图标
const RenderIcon = ({ icon }) => {
  if (!icon) return <></>
  if (icon.includes('http')) return <img src={icon} class="tab-icon" />
  if (icon.includes('svg-')) return <SvgIcon name={icon} class="tab-icon" style="width:14px;height:14px" />
  return <el-icon class="tab-icon">{h(resolveComponent(icon))}</el-icon>
}

//拖拽排序
const onTabsDrop = () => {
  Sortable.create(document.querySelector('.el-tabs__nav'), {
    draggable: '.el-tabs__item',
    animation: 300,
    onEnd({ newIndex, oldIndex }) {
      const tabList = [...tabStore.tabList]
      const currRow = tabList.splice(oldIndex, 1)[0]
      tabList.splice(newIndex, 0, currRow)
      tabStore.tabList = tabList
    },
  })
}

onMounted(() => {
  onTabsDrop()
})
</script>

<style scoped lang="scss">
.tabs-box {
  width: 0;
  flex: 1;
  background-color: var(--el-bg-color);
  user-select: none;

  :deep(.el-tabs) {
    .el-tabs__header {
      box-sizing: border-box;
      height: 40px;
      margin: 0;
      border-bottom: none;

      .el-tabs__nav-wrap {
        .el-tabs__nav {
          display: flex;
          border: none;

          .el-tabs__item {
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;

            &.is-active {
              color: var(--el-color-primary);
              border-bottom: 2px solid var(--el-color-primary);
            }

            .el-dropdown {
              height: 100%;
            }

            .el-dropdown_content {
              height: 100%;
              display: flex;
              align-items: center;
              color: var(--el-text-color-regular);

              .tab-icon {
                font-size: 14px;
                height: 14px;
                margin-right: 4px;
              }

              .is-icon-close {
                margin-top: 1.5px;
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
}
</style>
