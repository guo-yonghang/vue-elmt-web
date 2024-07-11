import { useUserStore } from '@/store/user.js'

const auth = {
  mounted(el, binding) {
    const { value } = binding
    const userStore = useUserStore()
    if (!value || userStore.authButtonList.includes(value)) {
      el.remove()
    }
  },
}

export default auth
