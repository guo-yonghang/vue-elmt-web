import http from '@/config/http'

export const getHostIp = () => http.get('https://api.ipify.org')
