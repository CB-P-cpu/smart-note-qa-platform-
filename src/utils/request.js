import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'

const service = axios.create({
  baseURL: '/api',
  timeout: 15000
})

service.interceptors.request.use(config => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`
  }
  return config
})

service.interceptors.response.use(
  res => {
    const { code, message, data } = res.data
    // 兼容后端没有返回code的场景：code为undefined或者code===0都视为成功
    if (code === undefined || code === 0) {
      return data
    } else if (code === 401) {
      ElMessage.error('登录已过期，请重新登录')
      const userStore = useUserStore()
      userStore.logout()
      location.href = '/login'
      return Promise.reject(message)
    } else if (code === 403) {
      ElMessage.error('没有权限操作')
      return Promise.reject(message)
    } else {
      ElMessage.error(message || '请求失败')
      return Promise.reject(message)
    }
  },
  err => {
    ElMessage.error('网络异常')
    return Promise.reject(err)
  }
)

export default service

