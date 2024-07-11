import auth from '@/directives/modules/auth.js'
import debounce from '@/directives/modules/debounce.js'
import throttle from '@/directives/modules/throttle.js'

const directives = {
  install(app) {
    app.directive('auth', auth)
    app.directive('debounce', debounce)
    app.directive('throttle', throttle)
  },
}

export default directives
