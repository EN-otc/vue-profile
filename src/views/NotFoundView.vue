<template>
  <div class="page">
    <h1 class="code">404</h1>
    <p>页面不存在，请检查地址是否正确。</p>
    <RouterLink to="/" class="back-btn">← 返回首页</RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.page {
  padding: 3rem 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 1.5rem;
  color: var(--text-primary);
  box-shadow: var(--shadow);
  text-align: center;
}
.code {
  font-size: 4rem;
  color: var(--accent);
  margin-bottom: 1rem;
}
.back-btn {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.5rem 1.2rem;
  background: var(--accent);
  color: #fff;
  border-radius: 2rem;
  text-decoration: none;
  font-size: 0.9rem;
}
</style>