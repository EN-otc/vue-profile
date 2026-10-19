import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true')
  const username = ref(localStorage.getItem('username') || '')
  const displayName = computed(() => {
    return isLoggedIn.value ? `👤 ${username.value}` : '未登录'
  })

  function login(name) {
    isLoggedIn.value = true
    username.value = name
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('username', name)
  }

  function logout() {
    isLoggedIn.value = false
    username.value = ''
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
  }

  return {
    isLoggedIn,
    username,
    displayName,
    login,
    logout
  }
})