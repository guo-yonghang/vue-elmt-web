import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useDebounceFn } from '@vueuse/core'
import { HTTP_STATUS_LIST } from '@/constants/index.js'

//防抖弹出错误信息
const debouncedMessage = useDebounceFn((content) => {
  ElMessage.error(content)
}, 500)

const instance = axios.create({
  baseURL: '',
  timeout: 60000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

instance.interceptors.request.use(
  (config) => {
    // config.headers['Content-Type'] = ''
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    if (response.data.code !== '200') {
      return Promise.reject()
    }
    return response.data.data
  },
  (error) => {
    const { message } = error.message
    message.includes('timeout') && debouncedMessage('请求超时！请稍后重试')
    message.includes('Network Error') && debouncedMessage('网络错误！请稍后重试')
    if (error.response) {
      const errorItem = HTTP_STATUS_LIST.find((item) => item.code == error.response.status)
      errorItem && debouncedMessage(errorItem.message)
    }
    return Promise.reject(error)
  },
)

const get = (url, params, config) => {
  return instance.get(url, { params, ...config })
}

const post = (url, data, config) => {
  return instance.post(url, data, config)
}

const put = (url, data, config) => {
  return instance.put(url, data, config)
}

const del = (url, config) => {
  return instance.delete(url, config)
}

const download = (url, data, config) => {
  return instance.post(url, data, { responseType: 'blob', ...config })
}

export default { get, post, put, del, download }
