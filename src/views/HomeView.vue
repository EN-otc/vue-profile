<template>
  <div class="page">
    <ProfileCard
      :name="name"
      :student-id="studentId"
      :class-name="className"
      :avatar-url="avatarUrl"
      :bio="bio"
      :skills="skills"
      :hobbies="hobbies"
      @save="handleSave"
    />

    <!-- ★ 新增：个人时间线 -->
    <el-card class="timeline-card" shadow="hover">
      <h3 class="timeline-title">📅 我的成长时间线</h3>
      <el-timeline>
        <el-timeline-item
          v-for="item in timeline"
          :key="item.date"
          :timestamp="item.date"
          placement="top"
          :type="item.type"
        >
          <h4 class="event-title">{{ item.title }}</h4>
          <p class="event-desc">{{ item.desc }}</p>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import ProfileCard from '../components/ProfileCard.vue'
import { useProjectStore } from '../stores/projectStore'

const projectStore = useProjectStore()
const { name, studentId, className, avatarUrl, bio, skills, hobbies } =
  storeToRefs(projectStore)

// 时间线数据
const timeline = [
  {
    date: '2024-09',
    title: '进入重庆工程学院',
    desc: '24 计科 2 班，开启大学生活',
    type: 'primary'
  },
  {
    date: '2025-03',
    title: '开始接触 Web 前端',
    desc: '学习 HTML / CSS / JavaScript 基础',
    type: 'success'
  },
  {
    date: '2025-09',
    title: '学习 Vue3 全家桶',
    desc: '掌握组合式 API、Vue Router、Pinia',
    type: 'warning'
  },
  {
    date: '2025-10',
    title: '完成课程实验项目',
    desc: '个人主页 + 项目展示 + 文章管理',
    type: 'danger'
  },
  {
    date: '未来',
    title: '持续学习，探索前端工程化',
    desc: '深入学习性能优化、TypeScript、构建工具',
    type: 'info'
  }
]

function handleSave(payload) {
  projectStore.updateProfile(payload)
  console.log('✅ 已保存:', payload)
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.timeline-card {
  background: var(--bg-card) !important;
  border: 1px solid var(--border) !important;
  border-radius: 1.5rem !important;
}
.timeline-card :deep(.el-card__body) {
  padding: 2rem;
}
.timeline-title {
  font-size: 1.05rem;
  color: var(--accent);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.event-title {
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 0.3rem;
}
.event-desc {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.6;
}
</style>