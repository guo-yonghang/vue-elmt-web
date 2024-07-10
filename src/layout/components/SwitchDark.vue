<template>
  <el-switch v-model="appStore.isDark" :active-text="activeText" @change="onDarkChange" />
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/index'
import { useSetting } from '@/hooks/index'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const appStore = useAppStore()
const { updatePrimary } = useSetting()

//黑夜模式变化
const onDarkChange = (e) => {
  updatePrimary()
}

//文字内容
const activeText = computed(() => {
  return appStore.isDark ? t('setting.open') : t('setting.shut')
})
</script>

<style scoped lang="scss"></style>
