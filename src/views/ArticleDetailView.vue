<template>
  <div v-if="article" class="detail-page">
    <div class="back-row">
      <button class="back-btn" @click="goBack">← 返回列表</button>
    </div>

    <header class="detail-header">
      <h1 class="detail-title">{{ article.title }}</h1>
      <div class="meta">
        <span class="category">{{ article.category }}</span>
        <span class="status" :class="statusClass">{{ article.status }}</span>
        <span class="date">📅 {{ article.date }}</span>
      </div>
    </header>

    <section class="detail-section">
      <h3 class="section-title">摘要</h3>
      <p class="detail-desc">{{ article.summary }}</p>
    </section>

    <section class="detail-section">
      <h3 class="section-title">正文</h3>
      <p class="detail-content">{{ article.content }}</p>
    </section>
  </div>

  <div v-else class="detail-page">
    <p>正在跳转…</p>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '../stores/articleStore'

const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()

const article = computed(() => articleStore.getArticleById(route.params.id))

const statusClass = computed(() => {
  if (!article.value) return 'draft'
  const map = { '已发布': 'pub', '草稿': 'draft' }
  return map[article.value.status] || 'draft'
})

function goBack() {
  router.go(-1)
}

function checkArticleExists() {
  if (!article.value) {
    console.warn(`文章 ${route.params.id} 不存在，返回列表`)
    router.replace('/articles')
  }
}

onMounted(checkArticleExists)
watch(() => route.params.id, checkArticleExists)
</script>

<style scoped>
.detail-page {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: var(--shadow);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.back-row {
  display: flex;
  justify-content: flex-start;
}
.back-btn {
  background: var(--bg-panel);
  color: var(--text-primary);
  border: 1px solid var(--border);
  padding: 0.4rem 1rem;
  border-radius: 2rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}
.back-btn:hover {
  background: var(--accent);
  color: #fff;
}
.detail-header {
  border-bottom: 1px dashed var(--border);
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.detail-title {
  font-size: 1.6rem;
  color: var(--text-primary);
}
.meta {
  display: flex;
  gap: 0.6rem;
  align-items: center;
  flex-wrap: wrap;
}
.category {
  font-size: 0.8rem;
  color: var(--accent);
  background: rgba(139, 92, 246, 0.12);
  padding: 0.2rem 0.8rem;
  border-radius: 1rem;
}
.status {
  font-size: 0.75rem;
  padding: 0.2rem 0.7rem;
  border-radius: 1rem;
  color: #fff;
}
.status.pub   { background: #22c55e; }
.status.draft { background: #94a3b8; }
.date {
  font-size: 0.8rem;
  color: var(--text-secondary);
}
.detail-section {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.section-title {
  font-size: 1rem;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.section-title::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 16px;
  border-radius: 2px;
  background: var(--accent);
}
.detail-desc,
.detail-content {
  line-height: 1.8;
  color: var(--text-secondary);
  white-space: pre-wrap;
}
</style>