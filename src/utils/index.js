//生成随机id
export function generateId(length = 6, id = '') {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (var i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return id
}

//阻塞函数
export function sleep(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
