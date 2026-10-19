<template>
  <el-card class="project-section" shadow="hover">
    <h2 class="section-heading">🚀 我的项目作品</h2>

    <div v-if="projects.length" class="project-grid">
      <ProjectCard
        v-for="(project, index) in projects"
        :key="project.id"
        :project="project"
        :index="index"
      >
        <!-- 具名插槽 #title -->
        <template #title="{ project: p }">
          <span class="card-icon">📦</span>
          <span>{{ p.title }}</span>
        </template>

        <!-- 默认插槽 -->
        <p class="card-desc">{{ project.description }}</p>
        <div class="tag-row">
          <el-tag
            v-for="tag in project.tags"
            :key="tag"
            size="small"
            round
            effect="plain"
          >
            {{ tag }}
          </el-tag>
        </div>

        <!-- 具名 + 作用域插槽 #actions -->
        <template #actions="{ project: p, index: i }">
          <el-button size="small" type="primary" round @click="goDetail(p, i)">
            查看详情
          </el-button>
          <el-button size="small" plain round @click="handleOpen(p, i)">
            源码
          </el-button>
        </template>
      </ProjectCard>
    </div>

    <el-empty v-else description="暂无项目" :image-size="100" />
  </el-card>
</template>

<script setup>
import ProjectCard from './ProjectCard.vue'
import { useRouter } from 'vue-router'

defineProps({
  projects: { type: Array, default: () => [] }
})

const router = useRouter()

function goDetail(project, index) {
  console.log(`打开第 ${index + 1} 个项目：`, project.title)
  router.push(`/projects/${project.id}`)
}

function handleOpen(project, index) {
  console.log(`打开第 ${index + 1} 个项目：`, project.title)
  alert(`即将打开「${project.title}」的源码仓库`)
}
</script>

<style scoped>
.project-section {
  background: var(--bg-card) !important;
  border: 1px solid var(--border) !important;
  border-radius: 1.5rem !important;
}
.project-section :deep(.el-card__body) {
  padding: 2rem;
}
.section-heading {
  font-size: 1.3rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.2rem;
}
.card-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 0.8rem;
}
.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
</style>