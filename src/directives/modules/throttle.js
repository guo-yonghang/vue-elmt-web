const throttle = {
  mounted(el, binding) {
    if (typeof binding.value !== 'function') {
      throw 'v-throttle binding must be a function'
    }
    let timer
    el.__handleClick__ = function () {
      timer && clearTimeout(timer)
      if (!el.disabled) {
        el.disabled = true
        binding.value()
        timer = setTimeout(() => {
          el.disabled = false
        }, 1000)
      }
    }
    el.addEventListener('click', el.__handleClick__)
  },
  beforeUnmount(el) {
    el.removeEventListener('click', el.__handleClick__)
  },
}

export default throttle
