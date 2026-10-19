<template>
  <el-card class="project-card" shadow="hover">
    <!-- 具名插槽 #title -->
    <header class="card-header">
      <div class="card-title">
        <slot name="title" :project="project" :index="index">
          {{ project.title }}
        </slot>
      </div>
      <el-tag :type="statusType" size="small" round>
        {{ project.status }}
      </el-tag>
    </header>

    <!-- 默认插槽 -->
    <div class="card-body">
      <slot :project="project">
        <p>{{ project.description }}</p>
      </slot>
    </div>

    <!-- 具名 + 作用域插槽 #actions -->
    <footer class="card-footer">
      <slot name="actions" :project="project" :index="index">
        <el-button size="small" type="primary" round>查看详情</el-button>
      </slot>
    </footer>
  </el-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: { type: Object, required: true },
  index:   { type: Number, default: 0 }
})

const statusType = computed(() => {
  const map = {
    '已完成': 'success',
    '进行中': 'warning',
    '计划中': 'info'
  }
  return map[props.project.status] || 'info'
})
</script>

<style scoped>
.project-card {
  background: var(--bg-panel) !important;
  border: 1px solid var(--border) !important;
  border-radius: 1rem !important;
  transition: transform 0.15s, border-color 0.2s;
}
.project-card:hover {
  transform: translateY(-3px);
  border-color: var(--accent) !important;
}
.project-card :deep(.el-card__body) {
  padding: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}
.card-title {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  color: var(--text-primary);
  font-size: 1.05rem;
}
.card-body {
  flex: 1;
  color: var(--text-secondary);
}
.card-footer {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}
</style>