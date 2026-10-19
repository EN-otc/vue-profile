import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useArticleStore = defineStore('article', () => {
  // ============ state ============
  const articles = ref(loadArticles())

  // ============ getters ============
  const articleCount = computed(() => articles.value.length)
  const publishedCount = computed(() =>
    articles.value.filter(a => a.status === '已发布').length
  )

  // 按分类筛选
  function getByCategory(category) {
    if (!category || category === '全部') return articles.value
    return articles.value.filter(a => a.category === category)
  }

  // 按 id 查
  function getArticleById(id) {
    return articles.value.find(a => a.id === Number(id))
  }

  // ============ actions ============
  function saveArticle(article) {
    const idx = articles.value.findIndex(a => a.id === article.id)
    if (idx !== -1) {
      articles.value[idx] = JSON.parse(JSON.stringify(article))
    } else {
      articles.value.push(JSON.parse(JSON.stringify(article)))
    }
    persist()
  }

  function removeArticle(id) {
    const idx = articles.value.findIndex(a => a.id === id)
    if (idx !== -1) {
      articles.value.splice(idx, 1)
      persist()
    }
  }

  function addArticle(article) {
    articles.value.push(JSON.parse(JSON.stringify(article)))
    persist()
  }

  function persist() {
    localStorage.setItem('articles', JSON.stringify(articles.value))
  }

  function loadArticles() {
    const raw = localStorage.getItem('articles')
    if (raw) {
      try {
        return JSON.parse(raw)
      } catch (e) {
        console.warn('articles 数据解析失败，使用默认值')
      }
    }
    // 默认数据
    return [
      {
        id: 1,
        title: 'Vue3 组合式 API 入门',
        summary: '从 setup 语法糖出发，整理 ref、reactive、computed、watch 的常用写法。',
        content: '这是一篇关于 Vue3 组合式 API 的入门笔记……（正文略）',
        category: '前端',
        status: '已发布',
        date: '2025-09-15'
      },
      {
        id: 2,
        title: 'Vue Router 的三种导航方式',
        summary: '对比 push、replace、go(-1) 的历史记录差异与适用场景。',
        content: 'Vue Router 提供了多种编程式导航方法……（正文略）',
        category: '前端',
        status: '已发布',
        date: '2025-09-28'
      },
      {
        id: 3,
        title: 'Pinia 的 Setup Store 写法',
        summary: '用组合式风格定义 Store，对比 Options Store 的写法差异。',
        content: 'Pinia 支持两种 Store 写法……（正文略）',
        category: '前端',
        status: '草稿',
        date: '2025-10-10'
      }
    ]
  }

  return {
    // state
    articles,
    // getters
    articleCount, publishedCount,
    // actions
    getByCategory, getArticleById, saveArticle, removeArticle, addArticle
  }
})