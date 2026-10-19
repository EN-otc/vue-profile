<template>
  <div class="login-page">
    <h2 class="title">🔐 后台登录</h2>
    <p class="subtitle">账号：dsy / 密码：123</p>

    <div class="form">
      <input
        ref="usernameInput"
        v-model="username"
        class="input"
        type="text"
        placeholder="用户名"
        @keyup.enter="focusPassword"
      />
      <input
        ref="passwordInput"
        v-model="password"
        class="input"
        type="password"
        placeholder="密码"
        @keyup.enter="handleLogin"
      />
      <button class="login-btn" @click="handleLogin">登录</button>
      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')
const errorMsg = ref('')

const usernameInput = ref(null)
const passwordInput = ref(null)

const VALID_USER = 'dsy'
const VALID_PASS = '123'

function handleLogin() {
  if (username.value !== VALID_USER) {
    errorMsg.value = '用户名错误'
    return
  }
  if (password.value !== VALID_PASS) {
    errorMsg.value = '密码错误'
    return
  }
  // 用 Store 的 login action
  userStore.login(username.value)
  console.log('✅ 登录成功：', username.value)
  router.push('/admin')
}

function focusPassword() {
  passwordInput.value?.focus()
}

onMounted(() => {
  usernameInput.value?.focus()
})
</script>

<style scoped>
.login-page {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  box-shadow: var(--shadow);
  color: var(--text-primary);
  max-width: 420px;
  margin: 0 auto;
}
.title {
  font-size: 1.4rem;
  text-align: center;
  margin-bottom: 0.5rem;
}
.subtitle {
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 1.5rem;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}
.input {
  padding: 0.7rem 1rem;
  border-radius: 0.7rem;
  border: 1px solid var(--border);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 0.95rem;
  outline: none;
  font-family: inherit;
}
.input:focus {
  border-color: var(--accent);
}
.login-btn {
  background: var(--accent);
  color: #fff;
  border: none;
  padding: 0.7rem 1rem;
  border-radius: 0.7rem;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;
}
.login-btn:hover {
  opacity: 0.9;
}
.error {
  color: #ef4444;
  font-size: 0.85rem;
  text-align: center;
}
</style>