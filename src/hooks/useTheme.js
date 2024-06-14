import { useDark } from '@vueuse/core'
import { getDarkColor, getLightColor } from '@/utils/color'

export const useTheme = () => {
  const isDark = useDark()
  //修改主题颜色
  const onChangePrimary = (val = '#366ef4') => {
    document.documentElement.style.setProperty('--el-color-primary', val)
    document.documentElement.style.setProperty('--el-color-primary-dark-2', isDark.value ? `${getLightColor(val, 0.2)}` : `${getDarkColor(val, 0.3)}`)
    for (let i = 1; i <= 9; i++) {
      const primaryColor = isDark.value ? `${getDarkColor(val, i / 10)}` : `${getLightColor(val, i / 10)}`
      document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, primaryColor)
    }
  }
  return {
    onChangePrimary,
  }
}
