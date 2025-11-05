import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),

  actions: {
    async login(email, password) {
      const { data } = await api.post('/login', { email, password })

      this.token = data.token
      localStorage.setItem('token', data.token)
      this.user = { email }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      window.location = '/login'
    }
  }
})
