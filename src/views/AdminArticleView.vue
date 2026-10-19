<template>
  <div class="admin-panel">
    <header class="panel-header">
      <h2 class="panel-title">✏️ 编辑文章</h2>
      <el-button type="primary" round size="small" @click="openAddDialog">
        ➕ 新增文章
      </el-button>
    </header>

    <el-table
      :data="articleStore.articles"
      stripe
      style="width: 100%"
      empty-text="暂无文章"
    >
      <el-table-column type="index" label="#" width="40" align="center" />
      <el-table-column prop="title" label="标题" width="120" />
      <el-table-column prop="summary" label="摘要" min-width="220">
        <template #default="{ row }">
          <div class="cell-wrap">{{ row.summary }}</div>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="80" align="center">
        <template #default="{ row }">
          <el-tag size="small" effect="plain">{{ row.category }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="90" align="center">
        <template #default="{ row }">
          <el-tag :type="row.status === '已发布' ? 'success' : 'info'" size="small" round>
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="日期" width="100" align="center" />
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
      :title="isEdit ? '编辑文章' : '新增文章'"
      width="600px"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="摘要" prop="summary">
          <el-input v-model="form.summary" type="textarea" :rows="2" />
        </el-form-item>
        <el-form-item label="正文">
          <el-input v-model="form.content" type="textarea" :rows="4" />
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="form.category" style="width:100%">
            <el-option label="前端" value="前端" />
            <el-option label="后端" value="后端" />
            <el-option label="随笔" value="随笔" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" style="width:100%">
            <el-option label="已发布" value="已发布" />
            <el-option label="草稿" value="草稿" />
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker v-model="form.date" type="date" value-format="YYYY-MM-DD" style="width:100%" />
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
import { useArticleStore } from '../stores/articleStore'

const articleStore = useArticleStore()

const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null)

const form = reactive({
  id: null, title: '', summary: '', content: '',
  category: '前端', status: '草稿', date: ''
})

const rules = {
  title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
  summary: [{ required: true, message: '摘要不能为空', trigger: 'blur' }]
}

function openAddDialog() {
  isEdit.value = false
  Object.assign(form, {
    id: null, title: '', summary: '', content: '',
    category: '前端', status: '草稿',
    date: new Date().toISOString().slice(0, 10)
  })
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate())
}

function openEditDialog(row) {
  isEdit.value = true
  Object.assign(form, JSON.parse(JSON.stringify(row)))
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate())
}

async function handleSubmit() {
  await formRef.value.validate((valid) => {
    if (!valid) return
    if (isEdit.value) {
      articleStore.saveArticle(form)
      ElMessage.success('✅ 保存成功')
    } else {
      const newId = articleStore.articles.length === 0
        ? 1
        : Math.max(...articleStore.articles.map(a => a.id)) + 1
      articleStore.addArticle({ ...form, id: newId })
      ElMessage.success('✅ 新增成功')
    }
    dialogVisible.value = false
  })
}

function handleDelete(row) {
  ElMessageBox.confirm(`确定删除文章「${row.title}」吗？`, '删除确认', {
    type: 'warning', confirmButtonText: '确定', cancelButtonText: '取消'
  }).then(() => {
    articleStore.removeArticle(row.id)
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