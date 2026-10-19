<template>
  <el-card class="article-section" shadow="hover">
    <header class="section-header">
      <h2 class="section-heading">📝 我的文章</h2>

      <el-radio-group v-model="currentCategory" size="small">
        <el-radio-button
          v-for="cat in categories"
          :key="cat"
          :value="cat"
        >
          {{ cat }}
        </el-radio-button>
      </el-radio-group>
    </header>

    <p class="count-tip">
      共 {{ articleStore.articleCount }} 篇，已发布 {{ articleStore.publishedCount }} 篇
    </p>

    <div v-if="filteredArticles.length" class="article-grid">
      <ArticleCard
        v-for="article in filteredArticles"
        :key="article.id"
        :article="article"
        @read="goDetail"
      />
    </div>

    <el-empty v-else description="该分类下暂无文章" :image-size="100" />
  </el-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useArticleStore } from '../stores/articleStore'
import ArticleCard from '../components/ArticleCard.vue'

const router = useRouter()
const articleStore = useArticleStore()

const categories = ['全部', '前端', '后端', '随笔']
const currentCategory = ref('全部')

const filteredArticles = computed(() =>
  articleStore.getByCategory(currentCategory.value)
)

function goDetail(article) {
  router.push(`/articles/${article.id}`)
}
</script>

<style scoped>
.article-section {
  background: var(--bg-card) !important;
  border: 1px solid var(--border) !important;
  border-radius: 1.5rem !important;
}
.article-section :deep(.el-card__body) {
  padding: 2rem;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1rem;
}
.section-heading {
  font-size: 1.3rem;
  color: var(--text-primary);
}
.count-tip {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 1.2rem;
}
.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.2rem;
}
</style>