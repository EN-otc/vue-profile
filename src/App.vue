<template>
  <el-container class="app-container" direction="vertical">
    <el-header class="app-header-wrap">
      <AppHeader v-model:is-dark-mode="isDarkMode" />
    </el-header>

    <el-main class="app-main">
      <RouterView />
    </el-main>

    <el-footer class="app-footer-wrap">
      <AppFooter />
    </el-footer>
  </el-container>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

const isDarkMode = ref(false)

watch(isDarkMode, (val) => {
  document.documentElement.className = val ? 'dark-theme' : 'light-theme'
})

onMounted(() => {
  document.documentElement.className = isDarkMode.value ? 'dark-theme' : 'light-theme'
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: system-ui, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}
html, body { min-height: 100vh; }
body {
  display: flex;
  justify-content: center;
  padding: 1.5rem 1rem;
}
#app { width: 100%; max-width: 1100px; }

:root {
  --el-color-primary: #8b5cf6;
  --el-color-primary-light-3: #a78bfa;
  --el-color-primary-light-5: #c4b5fd;
  --el-color-primary-light-7: #ddd6fe;
  --el-color-primary-light-8: #ede9fe;
  --el-color-primary-light-9: #f5f3ff;
  --el-color-primary-dark-2: #7c3aed;
  --el-color-success: #10b981;
  --el-color-success-light-3: #34d399;
  --el-color-success-light-5: #6ee7b7;
  --el-color-success-light-9: #ecfdf5;
  --el-color-warning: #f59e0b;
  --el-color-warning-light-3: #fbbf24;
  --el-color-warning-light-5: #fcd34d;
  --el-color-warning-light-9: #fffbeb;
  --el-color-danger: #ec4899;
  --el-color-danger-light-3: #f472b6;
  --el-color-danger-light-5: #f9a8d4;
  --el-color-danger-light-9: #fdf2f8;
  --el-color-danger-dark-2: #db2777;
  --el-color-info: #94a3b8;
  --el-color-info-light-3: #cbd5e1;
  --el-color-info-light-5: #e2e8f0;
  --el-color-info-light-9: #f8fafc;
}

html.light-theme {
  --bg-page: #f5f1ff;
  --bg-card: #ffffff;
  --bg-panel: #ede5ff;
  --bg-input: #ffffff;
  --accent: #8b5cf6;
  --text-primary: #2e1065;
  --text-secondary: #6b5b95;
  --border: #e5d9ff;
  --tag-bg: #a596e6;
  --tag-text: #ffffff;
  --shadow: 0 8px 28px rgba(139, 92, 246, 0.15);
  --status-done: #22c55e;
  --status-doing: #f59e0b;
  --status-plan: #94a3b8;
}

html.dark-theme {
  --bg-page: #0a0416;
  --bg-card: #1e1633;
  --bg-panel: #2a1f47;
  --bg-input: #2a1f47;
  --accent: #a78bfa;
  --text-primary: #f5f3ff;
  --text-secondary: #c4b5fd;
  --border: #4c3a7a;
  --tag-bg: #4c3a7a;
  --tag-text: #ede9fe;
  --shadow: 0 8px 28px rgba(0, 0, 0, 0.8);
  --status-done: #34d399;
  --status-doing: #fbbf24;
  --status-plan: #94a3b8;

  --el-color-primary: #a78bfa;
  --el-color-primary-light-3: #8b5cf6;
  --el-color-primary-light-5: #7c3aed;
  --el-color-primary-light-7: #6d28d9;
  --el-color-primary-light-8: #5b21b6;
  --el-color-primary-light-9: #4c1d95;
  --el-color-primary-dark-2: #c4b5fd;
}
html.light-theme body { background: var(--bg-page); }
html.dark-theme body  { background: var(--bg-page); }

/* ★ 暗色模式：Element Plus 表格 */
html.dark-theme .el-table {
  --el-table-bg-color: #1e1633;
  --el-table-tr-bg-color: #1e1633;
  --el-table-header-bg-color: #2a1f47;
  --el-table-header-text-color: #f5f3ff;
  --el-table-text-color: #ede9fe;
  --el-table-border-color: #4c3a7a;
  --el-table-row-hover-bg-color: #2a1f47;
  background-color: #1e1633 !important;
  color: #ede9fe !important;
}
html.dark-theme .el-table th.el-table__cell {
  background-color: #2a1f47 !important;
  color: #f5f3ff !important;
  border-bottom-color: #4c3a7a !important;
}
html.dark-theme .el-table td.el-table__cell {
  background-color: #1e1633 !important;
  border-bottom-color: #3b2a6b !important;
  color: #ede9fe !important;
}
html.dark-theme .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
  background-color: #241548 !important;
}
html.dark-theme .el-table__body tr:hover > td.el-table__cell {
  background-color: #2a1f47 !important;
}
html.dark-theme .el-table::before,
html.dark-theme .el-table__inner-wrapper::before {
  background-color: #4c3a7a !important;
}

/* ★ 暗色模式：弹窗 / 表单 / 输入框 */
html.dark-theme .el-dialog {
  background-color: #1e1633 !important;
  color: #ede9fe !important;
}
html.dark-theme .el-dialog__title { color: #f5f3ff !important; }
html.dark-theme .el-form-item__label { color: #c4b5fd !important; }
html.dark-theme .el-input__wrapper,
html.dark-theme .el-textarea__inner {
  background-color: #2a1f47 !important;
  box-shadow: 0 0 0 1px #4c3a7a inset !important;
  color: #f5f3ff !important;
}
html.dark-theme .el-input__inner { color: #f5f3ff !important; }
html.dark-theme .el-input__inner::placeholder {
  color: #a78bfa !important;
  opacity: 0.6;
}
html.dark-theme .el-select__wrapper {
  background-color: #2a1f47 !important;
  box-shadow: 0 0 0 1px #4c3a7a inset !important;
  color: #f5f3ff !important;
}
html.dark-theme .el-popper {
  background-color: #2a1f47 !important;
  border-color: #4c3a7a !important;
}
html.dark-theme .el-select-dropdown__item { color: #ede9fe !important; }
html.dark-theme .el-select-dropdown__item.hover,
html.dark-theme .el-select-dropdown__item:hover {
  background-color: #4c3a7a !important;
}
html.dark-theme .el-select-dropdown__item.is-selected { color: #a78bfa !important; }
html.dark-theme .el-picker-panel {
  background-color: #2a1f47 !important;
  border-color: #4c3a7a !important;
  color: #ede9fe !important;
}
html.dark-theme .el-date-table td.current:not(.disabled) .el-date-table-cell__text {
  background-color: #a78bfa !important;
}

/* ★ 暗色模式：菜单 */
html.dark-theme .el-menu { background-color: transparent !important; }
html.dark-theme .el-menu-item { color: #c4b5fd !important; }
html.dark-theme .el-menu-item.is-active {
  color: #fff !important;
  background-color: #a78bfa !important;
}

/* ★ 暗色模式：卡片 */
html.dark-theme .el-card {
  background-color: #1e1633 !important;
  border-color: #4c3a7a !important;
}
html.dark-theme .el-card__body { background-color: transparent !important; }

/* 布局容器 */
.app-container {
  display: flex !important;
  flex-direction: column !important;
  gap: 1.2rem;
  width: 100%;
  max-width: 100%;
  overflow: visible;
}
.app-header-wrap {
  height: auto !important;
  padding: 0 !important;
  overflow: visible !important;
  width: 100%;
}
.app-main {
  padding: 0 !important;
  overflow: visible !important;
  flex: 1;
  width: 100%;
  min-width: 0;
}
.app-footer-wrap {
  height: auto !important;
  padding: 0 !important;
  width: 100%;
}

.el-button,
.el-tag,
.el-input__inner,
.el-menu-item {
  font-family: inherit !important;
}
</style>