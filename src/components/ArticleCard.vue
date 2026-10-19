<template>
  <el-card class="article-card" shadow="hover">
    <header class="card-head">
      <el-tag size="small" round effect="plain">{{ article.category }}</el-tag>
      <el-tag size="small" round :type="statusType">{{ article.status }}</el-tag>
    </header>

    <h3 class="card-title">{{ article.title }}</h3>
    <p class="card-summary">{{ article.summary }}</p>

    <footer class="card-foot">
      <span class="date">📅 {{ article.date }}</span>
      <el-button
        size="small"
        type="primary"
        round
        @click="emit('read', article)"
      >
        阅读全文 →
      </el-button>
    </footer>
  </el-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  article: { type: Object, required: true }
})

const emit = defineEmits(['read'])

const statusType = computed(() => {
  return props.article.status === '已发布' ? 'success' : 'info'
})
</script>

<style scoped>
.article-card {
  background: var(--bg-panel) !important;
  border: 1px solid var(--border) !important;
  border-radius: 1rem !important;
  transition: transform 0.15s, border-color 0.2s;
}
.article-card:hover {
  transform: translateY(-3px);
  border-color: var(--accent) !important;
}
.article-card :deep(.el-card__body) {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  height: 100%;
}
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-title {
  font-size: 1.1rem;
  color: var(--text-primary);
  font-weight: 600;
}
.card-summary {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  flex: 1;
}
.card-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.3rem;
}
.date {
  font-size: 0.8rem;
  color: var(--text-secondary);
}
</style>