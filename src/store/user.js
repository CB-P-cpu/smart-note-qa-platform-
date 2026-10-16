import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state() {
    return {
      token: localStorage.getItem('token') || '',
      userInfo: JSON.parse(localStorage.getItem('userInfo') || 'null')
    }
  },
  actions: {
    setToken(token, userInfo) {
      this.token = token
      this.userInfo = userInfo
      localStorage.setItem('token', token)
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    logout() {
      this.token = ''
      this.userInfo = null
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
    }
  }
})
