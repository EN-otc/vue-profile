<template>
  <el-card class="profile-card" shadow="hover">
    <div class="action-row">
      <el-button
        :type="isEditing ? 'success' : 'primary'"
        size="small"
        round
        @click="toggleEdit"
      >
        {{ isEditing ? '💾 保存' : '✏️ 编辑' }}
      </el-button>
    </div>

    <div class="user-info">
      <el-avatar :size="110" :src="avatarUrl" class="avatar" />
      <div class="info-text">
        <el-input
          v-if="isEditing"
          v-model="local.name"
          class="name-input"
          size="large"
          placeholder="姓名"
        />
        <h2 v-else class="user-name">{{ name }}</h2>

        <p class="meta">
          <span class="label">学号</span>
          <el-input
            v-if="isEditing"
            v-model="local.studentId"
            size="small"
            style="width:180px"
          />
          <template v-else>{{ studentId }}</template>
        </p>
        <p class="meta">
          <span class="label">班级</span>
          <el-input
            v-if="isEditing"
            v-model="local.className"
            size="small"
            style="width:180px"
          />
          <template v-else>{{ className }}</template>
        </p>
      </div>
    </div>

    <section class="section">
      <h3 class="section-title">个人简介</h3>
      <el-input
        v-if="isEditing"
        v-model="local.bio"
        type="textarea"
        :rows="4"
        placeholder="请输入简介"
      />
      <p v-else class="bio-text">{{ bio }}</p>
    </section>

    <section class="section">
      <el-input
        v-model="searchKeyword"
        size="large"
        placeholder="🔍 搜索技能或兴趣（按名称、描述或掌握程度）"
        clearable
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </section>

    <section class="section">
      <h3 class="section-title">技能</h3>
      <ul v-if="filteredSkills.length" class="detail-list">
        <li v-for="item in filteredSkills" :key="item.name" class="detail-item">
          <div class="detail-head">
            <span class="detail-name">{{ item.name }}</span>
            <el-tag size="small" round type="primary">{{ item.level }}</el-tag>
          </div>
          <el-progress
            :percentage="levelToPercent(item.level)"
            :stroke-width="8"
            :show-text="false"
            :color="progressColors"
            class="progress-bar"
          />
          <p class="detail-desc">{{ item.desc }}</p>
        </li>
      </ul>
      <el-empty v-else description="没有匹配的技能" :image-size="80" />
    </section>

    <section class="section">
      <h3 class="section-title">兴趣</h3>
      <ul v-if="filteredHobbies.length" class="detail-list">
        <li v-for="item in filteredHobbies" :key="item.name" class="detail-item">
          <div class="detail-head">
            <span class="detail-name">{{ item.name }}</span>
            <el-tag size="small" round type="warning">{{ item.level }}</el-tag>
          </div>
          <p class="detail-desc">{{ item.desc }}</p>
        </li>
      </ul>
      <el-empty v-else description="没有匹配的兴趣" :image-size="80" />
    </section>
  </el-card>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'

const props = defineProps({
  name: String,
  studentId: String,
  className: String,
  avatarUrl: String,
  bio: String,
  skills:  { type: Array, default: () => [] },
  hobbies: { type: Array, default: () => [] }
})

const emit = defineEmits(['save'])

const isEditing = ref(false)
const local = reactive({
  name: props.name,
  studentId: props.studentId,
  className: props.className,
  bio: props.bio
})

const searchKeyword = ref('')

// 同时匹配 name / desc / level
function filterList(list) {
  const kw = searchKeyword.value.trim().toLowerCase()
  if (!kw) return list
  return list.filter(item =>
    item.name.toLowerCase().includes(kw) ||
    (item.desc && item.desc.toLowerCase().includes(kw)) ||
    (item.level && item.level.toLowerCase().includes(kw))
  )
}
const filteredSkills  = computed(() => filterList(props.skills))
const filteredHobbies = computed(() => filterList(props.hobbies))

function levelToPercent(level) {
  const map = { '熟练': 90, '了解': 55, '热爱': 85, '爱好': 75 }
  return map[level] || 60
}

const progressColors = [
  { color: '#8b5cf6', percentage: 40 },
  { color: '#a78bfa', percentage: 70 },
  { color: '#c4b5fd', percentage: 100 }
]

function toggleEdit() {
  if (isEditing.value) {
    emit('save', { ...local })
  }
  isEditing.value = !isEditing.value
}
</script>

<style scoped>
.profile-card {
  background: var(--bg-card) !important;
  border: 1px solid var(--border) !important;
  border-radius: 1.5rem !important;
}
.profile-card :deep(.el-card__body) {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  padding: 2rem;
}
.action-row { display: flex; justify-content: flex-end; }
.user-info {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}
.avatar {
  border: 3px solid var(--accent);
  background: var(--bg-panel);
  flex-shrink: 0;
}
.info-text { flex: 1; min-width: 180px; }
.user-name {
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 0.6rem;
}
.meta {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-top: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.label {
  display: inline-block;
  width: 3rem;
  color: var(--accent);
  font-weight: 600;
}
.section {
  border-top: 1px dashed var(--border);
  padding-top: 1.2rem;
}
.section-title {
  font-size: 1.05rem;
  color: var(--accent);
  margin-bottom: 0.8rem;
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
.bio-text { line-height: 1.7; color: var(--text-secondary); }
.detail-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.detail-item {
  background: var(--bg-panel);
  border: 1px solid var(--border);
  border-radius: 0.8rem;
  padding: 0.8rem 1rem;
  transition: transform 0.15s, border-color 0.2s;
}
.detail-item:hover {
  transform: translateX(4px);
  border-color: var(--accent);
}
.detail-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}
.detail-name {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 1rem;
}
.progress-bar { margin-bottom: 0.4rem; }
.detail-desc {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.5;
}
.name-input { margin-bottom: 0.6rem; }
</style>