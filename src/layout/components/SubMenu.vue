<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.type === 1 && subItem.children?.length" :index="subItem.path">
      <template #title>
        <el-icon v-if="subItem.icon">
          <component :is="subItem.icon"></component>
        </el-icon>
        <span class="sle">{{ subItem.title }}</span>
      </template>
      <SubMenu :menuList="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path" @click="onSubItem(subItem)">
      <el-icon v-if="subItem.icon">
        <component :is="subItem.icon"></component>
      </el-icon>
      <template #title>
        <span class="sle">{{ subItem.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({ menuList: { type: Array, default: () => [] } })

const router = useRouter()

const onSubItem = (subItem) => {
  router.push(subItem.path)
}
</script>

<style lang="scss" scoped></style>
