<template>
  <div class="admin-panel">
    <header class="panel-header">
      <h2 class="panel-title">✏️ 编辑项目信息</h2>
      <el-button type="primary" round size="small" @click="openAddDialog">
        ➕ 新增项目
      </el-button>
    </header>

    <el-table
      :data="projectStore.projects"
      stripe
      style="width: 100%"
      empty-text="暂无项目"
    >
      <el-table-column type="index" label="#" width="40" align="center" />
      <el-table-column prop="title" label="项目名称" width="90" />
      <el-table-column prop="description" label="项目简介" min-width="220">
        <template #default="{ row }">
          <div class="cell-wrap">{{ row.description }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="90" align="center">
        <template #default="{ row }">
          <el-tag :type="statusType(row.status)" size="small" round>
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="技术标签" width="150">
        <template #default="{ row }">
          <el-tag
            v-for="tag in row.tags"
            :key="tag"
            size="small"
            effect="plain"
            class="mini-tag"
          >
            {{ tag }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template #default="{ row }">
          <div class="action-cell">
            <el-button size="small" type="primary" @click="openEditDialog(row)">
              编辑
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑项目' : '新增项目'"
      width="520px"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="项目名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="项目简介" prop="description">
          <el-input v-model="form.description" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" style="width:100%">
            <el-option label="已完成" value="已完成" />
            <el-option label="进行中" value="进行中" />
            <el-option label="计划中" value="计划中" />
          </el-select>
        </el-form-item>
        <el-form-item label="技术标签">
          <el-input v-model="tagInput" placeholder="英文逗号分隔" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useProjectStore } from '../stores/projectStore'

const projectStore = useProjectStore()

const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const tagInput = ref('')

const form = reactive({
  id: null, title: '', description: '', status: '计划中', tags: []
})

const rules = {
  title: [{ required: true, message: '项目名称不能为空', trigger: 'blur' }],
  description: [{ required: true, message: '项目简介不能为空', trigger: 'blur' }]
}

function statusType(status) {
  const map = { '已完成': 'success', '进行中': 'warning', '计划中': 'info' }
  return map[status] || 'info'
}

function openAddDialog() {
  isEdit.value = false
  Object.assign(form, { id: null, title: '', description: '', status: '计划中', tags: [] })
  tagInput.value = ''
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate())
}

function openEditDialog(row) {
  isEdit.value = true
  Object.assign(form, JSON.parse(JSON.stringify(row)))
  tagInput.value = row.tags.join(',')
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate())
}

async function handleSubmit() {
  await formRef.value.validate((valid) => {
    if (!valid) return
    form.tags = tagInput.value.split(',').map(s => s.trim()).filter(Boolean)
    if (isEdit.value) {
      projectStore.saveProject(form)
      ElMessage.success('✅ 保存成功')
    } else {
      const newId = projectStore.projects.length === 0
        ? 1
        : Math.max(...projectStore.projects.map(p => p.id)) + 1
      projectStore.addProject({ ...form, id: newId })
      ElMessage.success('✅ 新增成功')
    }
    dialogVisible.value = false
  })
}

function handleDelete(row) {
  ElMessageBox.confirm(`确定删除项目「${row.title}」吗？`, '删除确认', {
    type: 'warning', confirmButtonText: '确定', cancelButtonText: '取消'
  }).then(() => {
    projectStore.removeProject(row.id)
    ElMessage.success('🗑️ 已删除')
  }).catch(() => {})
}
</script>

<style scoped>
.admin-panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: var(--shadow);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem;
}
.panel-title {
  font-size: 1.15rem;
  color: var(--accent);
}
.cell-wrap {
  white-space: normal;
  word-break: break-word;
  line-height: 1.5;
  font-size: 0.85rem;
}
.mini-tag {
  margin: 2px 3px 2px 0;
}
.action-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
}
.action-cell .el-button {
  margin: 0 !important;
  width: 56px;
  padding: 3px 0;
  font-size: 0.78rem;
}
.admin-panel :deep(.el-table) {
  width: 100% !important;
}
</style>