<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <template v-if="!!subItem.visible">
      <el-sub-menu v-if="subItem.type === 1 && subItem.children?.length" :index="subItem.path">
        <template #title>
          <RenderIcon :icon="subItem.icon" />
          <span class="sle">{{ getTitle(subItem) }}</span>
        </template>
        <SubMenu :menuList="subItem.children" />
      </el-sub-menu>
      <el-menu-item v-else :index="subItem.path" @click="onSubItem(subItem)">
        <RenderIcon :icon="subItem.icon" />
        <template #title>
          <span class="sle">{{ getTitle(subItem) }}</span>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup lang="jsx">
import { h, resolveComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/index'

defineProps({ menuList: { type: Array, default: () => [] } })

const router = useRouter()
const appStore = useAppStore()

//菜单项图标
const RenderIcon = ({ icon }) => {
  if (!icon) return <></>
  if (icon.includes('http')) return <img src={icon} style="width:20px;margin-right:5px;" />
  return <el-icon>{h(resolveComponent(icon))}</el-icon>
}

//菜单项标题
const getTitle = ({ name, title }) => {
  return appStore.language === 'zh' ? title : name.split('\/').pop()
}

//点击菜单项
const onSubItem = (subItem) => {
  router.push(subItem.path)
}
</script>

<style lang="scss" scoped>
:deep(.el-menu) {
  .el-menu-item {
    border-left: 4px solid transparent;
    &.is-active {
      border-color: var(--el-color-primary);
      background-color: var(--el-menu-hover-bg-color);
    }
    &:hover {
      background-color: var(--el-menu-border-color) !important;
    }
  }
}
</style>
