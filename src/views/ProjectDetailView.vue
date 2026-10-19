<template>
  <div v-if="project" class="detail-page">
    <div class="back-row">
      <button class="back-btn" @click="goBack">← 返回列表</button>
    </div>

    <header class="detail-header">
      <h1 class="detail-title">📦 {{ project.title }}</h1>
      <span class="status" :class="statusClass">{{ project.status }}</span>
    </header>

    <section class="detail-section">
      <h3 class="section-title">项目简介</h3>
      <p class="detail-desc">{{ project.description }}</p>
    </section>

    <section class="detail-section">
      <h3 class="section-title">技术标签</h3>
      <div class="tag-row">
        <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </section>

    <section class="detail-section">
      <h3 class="section-title">项目编号</h3>
      <p class="detail-desc">ID: {{ project.id }}</p>
    </section>
  </div>

  <div v-else class="detail-page">
    <p>正在跳转…</p>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore } from '../stores/projectStore'

const route = useRoute()
const router = useRouter()
const projectStore = useProjectStore()

const project = computed(() => projectStore.getProjectById(route.params.id))

const statusClass = computed(() => {
  if (!project.value) return 'plan'
  const map = { '已完成': 'done', '进行中': 'doing', '计划中': 'plan' }
  return map[project.value.status] || 'plan'
})

function goBack() {
  router.go(-1)
}

function checkProjectExists() {
  if (!project.value) {
    console.warn(`项目 ${route.params.id} 不存在，返回列表`)
    router.replace('/projects')
  }
}

onMounted(checkProjectExists)
watch(() => route.params.id, checkProjectExists)
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  border-bottom: 1px dashed var(--border);
  padding-bottom: 1rem;
}
.detail-title {
  font-size: 1.6rem;
  color: var(--text-primary);
}
.status {
  font-size: 0.8rem;
  padding: 0.2rem 0.8rem;
  border-radius: 1rem;
  color: #fff;
}
.status.done  { background: var(--status-done); }
.status.doing { background: var(--status-doing); }
.status.plan  { background: var(--status-plan); }
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
.detail-desc {
  line-height: 1.7;
  color: var(--text-secondary);
}
.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.tag {
  background: var(--tag-bg);
  color: var(--tag-text);
  font-size: 0.8rem;
  padding: 0.25rem 0.8rem;
  border-radius: 1rem;
}
</style>