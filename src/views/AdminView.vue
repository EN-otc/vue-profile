<template>
  <div class="admin-page">
    <aside class="sidebar">
      <h3 class="sidebar-title">⚙️ 后台管理</h3>

      <el-menu
        :default-active="activeIndex"
        class="admin-menu"
        router
      >
        <el-menu-item index="/admin/profile">
          <el-icon><User /></el-icon>
          <span>编辑个人简介</span>
        </el-menu-item>
        <el-menu-item index="/admin/projects">
          <el-icon><Folder /></el-icon>
          <span>编辑项目信息</span>
        </el-menu-item>
        <el-menu-item index="/admin/articles">
          <el-icon><Document /></el-icon>
          <span>编辑文章</span>
        </el-menu-item>
      </el-menu>

      <el-button
        class="logout-btn"
        type="danger"
        plain
        size="small"
        @click="handleLogout"
      >
        退出登录
      </el-button>
    </aside>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import { User, Folder, Document } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const activeIndex = computed(() => route.path)

function handleLogout() {
  userStore.logout()
  console.log('已退出登录')
  router.push('/')
}
</script>

<style scoped>
.admin-page {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 1.2rem;
  align-items: start;
}
.sidebar {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 1.5rem;
  padding: 1.2rem;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.sidebar-title {
  font-size: 1.05rem;
  color: var(--accent);
  padding-bottom: 0.6rem;
  border-bottom: 1px dashed var(--border);
}
.admin-menu {
  border-right: none !important;
  background: transparent !important;
}
.content {
  min-height: 300px;
}

/* ====== 让 el-menu 适配主题 ====== */
:deep(.el-menu-item) {
  color: var(--text-secondary) !important;
  border-radius: 0.6rem;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
}
:deep(.el-menu-item:hover) {
  background: var(--bg-panel) !important;
  color: var(--text-primary) !important;
}
:deep(.el-menu-item.is-active) {
  background: var(--accent) !important;
  color: #fff !important;
}
</style>