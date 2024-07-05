import axios from 'axios'

const instance = axios.create({
  baseURL: '',
  timeout: 60000,
  withCredentials: true,
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
      message.warn(response.data.message)
      return Promise.reject()
    }
    return response.data.data
  },
  (error) => {
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
