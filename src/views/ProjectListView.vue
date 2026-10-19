<template>
  <ProjectSection :projects="projectStore.projects" />
</template>

<script setup>
import ProjectSection from '../components/ProjectSection.vue'
import { useProjectStore } from '../stores/projectStore'

const projectStore = useProjectStore()
</script>

<style scoped>
</style>

<style scoped>
.project-section {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: var(--shadow);
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
.tag {
  background: var(--tag-bg);
  color: var(--tag-text);
  font-size: 0.75rem;
  padding: 0.2rem 0.7rem;
  border-radius: 1rem;
}
.mini-btn {
  background: var(--accent);
  color: #fff;
  border: none;
  padding: 0.35rem 0.9rem;
  border-radius: 1.5rem;
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.2s;
}
.mini-btn:hover { opacity: 0.85; }
.mini-btn.ghost {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border);
}
</style>