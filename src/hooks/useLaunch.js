import { useSetting } from '@/hooks/index.js'

export const useLaunch = () => {
  const { updatePrimary, updateLanguage } = useSetting()

  updatePrimary()
  updateLanguage()
}
