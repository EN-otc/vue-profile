<template>
  <header class="app-header">
    <div class="top-row">
      <h1 class="title">📇 邓斯予 · 个人主页</h1>
      <div class="right-area">
        <el-tag type="info" size="small" round>
          {{ userStore.displayName }}
        </el-tag>
        <el-button
          size="small"
          :type="isDarkMode ? 'warning' : 'default'"
          round
          @click="isDarkMode = !isDarkMode"
        >
          {{ isDarkMode ? '☀️ 日间' : '🌙 夜间' }}
        </el-button>
      </div>
    </div>

    <el-menu
      mode="horizontal"
      :default-active="activeIndex"
      class="app-menu"
      router
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/projects">项目中心</el-menu-item>
      <el-menu-item index="/articles">文章</el-menu-item>
      <el-menu-item index="/about">关于</el-menu-item>
      <el-menu-item index="/admin/profile">后台管理</el-menu-item>
    </el-menu>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const isDarkMode = defineModel('isDarkMode', { type: Boolean, default: false })
const userStore = useUserStore()
const route = useRoute()

const activeIndex = computed(() => route.path)
</script>

<style scoped>
.app-header {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 1.2rem;
  box-shadow: var(--shadow);
  padding: 1rem 1.2rem 0;
  width: 100%;
  box-sizing: border-box;
}

/* 第一行：标题 + 右侧操作 */
.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px dashed var(--border);
}
.title {
  font-size: 1.05rem;
  color: var(--text-primary);
  font-weight: 600;
  white-space: nowrap;
}
.right-area {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

/* 第二行：导航菜单 */
.app-menu {
  border-bottom: none !important;
  background: transparent !important;
  width: 100%;
}
.app-menu :deep(.el-menu-item) {
  color: var(--text-secondary) !important;
  border-bottom-color: transparent !important;
  font-size: 0.9rem;
}
.app-menu :deep(.el-menu-item:hover) {
  background: var(--bg-panel) !important;
  color: var(--text-primary) !important;
}
.app-menu :deep(.el-menu-item.is-active) {
  color: #fff !important;
  background: var(--accent) !important;
  border-radius: 2rem !important;
  border-bottom-color: transparent !important;
}
</style>