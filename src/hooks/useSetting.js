import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/store/index'
import { getDarkColor, getLightColor } from '@/utils/color'

export const useSetting = () => {
  const i18n = useI18n()
  const appStore = useAppStore()
  //修改主题颜色
  const updatePrimary = () => {
    const { primary, isDark } = appStore
    document.documentElement.setAttribute('class', isDark ? 'dark' : '')
    document.documentElement.style.setProperty('--el-color-primary', primary)
    document.documentElement.style.setProperty('--el-color-primary-dark-2', isDark ? `${getLightColor(primary, 0.2)}` : `${getDarkColor(primary, 0.3)}`)
    for (let i = 1; i <= 9; i++) {
      const primaryColor = isDark ? `${getDarkColor(primary, i / 10)}` : `${getLightColor(primary, i / 10)}`
      document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, primaryColor)
    }
  }
  //修改系统语言
  const updateLanguage = () => {
    const { language } = appStore
    i18n.locale.value = language
  }
  return {
    updatePrimary,
    updateLanguage,
  }
}
