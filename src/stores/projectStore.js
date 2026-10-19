import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProjectStore = defineStore('project', () => {
  // ============ state ============
  // 个人信息
  const name = ref('邓斯予')
  const studentId = ref('249981205')
  const className = ref('24 计科 2 班')
  const avatarUrl = ref(
    'https://api.dicebear.com/7.x/initials/svg?seed=斯予&backgroundColor=8b5cf6&textColor=ffffff&fontWeight=700&fontSize=40'
  )
  const bio = ref(
    '计算机科学与技术专业，熟悉 Vue / React 基础，正在深入学习工程化与性能优化。课余喜欢摄影、羽毛球和探索新科技。座右铭：保持好奇，持续输出。'
  )
  const skills = ref([
    { name: 'Vue.js',     level: '熟练', desc: '熟悉组合式 API、组件通信、生命周期' },
    { name: 'JavaScript', level: '熟练', desc: '掌握 ES6+ 语法、异步、模块化' },
    { name: 'HTML5',      level: '熟练', desc: '语义化标签、表单、多媒体' },
    { name: 'CSS3',       level: '熟练', desc: 'Flex / Grid 布局、响应式、动画' },
    { name: 'React',      level: '了解', desc: '函数组件、Hooks 基础用法' },
    { name: 'TypeScript', level: '了解', desc: '基础类型、接口、泛型入门' },
    { name: 'Node.js',    level: '了解', desc: '能写简单脚本、了解 Express' },
    { name: 'Git',        level: '熟练', desc: '常用命令、分支管理、协作流程' }
  ])
  const hobbies = ref([
    { name: 'UI/UX 设计', level: '热爱', desc: '常逛 Dribbble，喜欢做界面原型' },
    { name: '摄影',       level: '爱好', desc: '街头摄影与风光，用手机也能出片' },
    { name: '羽毛球',     level: '爱好', desc: '每周打一次，主打双打' },
    { name: 'Python',     level: '了解', desc: '用过爬虫、数据分析基础' },
    { name: '阅读',       level: '热爱', desc: '偏技术书和科幻小说' },
    { name: '旅行',       level: '爱好', desc: '喜欢去没去过的小城市走走' }
  ])

  // 项目列表（用 localStorage 做持久化）
  const projects = ref(loadProjects())

  // ============ getters ============
  const projectCount = computed(() => projects.value.length)
  const doneCount = computed(() => projects.value.filter(p => p.status === '已完成').length)

  // ============ actions ============
  // 更新个人信息
  function updateProfile(payload) {
    if (payload.name !== undefined) name.value = payload.name
    if (payload.studentId !== undefined) studentId.value = payload.studentId
    if (payload.className !== undefined) className.value = payload.className
    if (payload.bio !== undefined) bio.value = payload.bio
  }

  // 保存单个项目
  function saveProject(project) {
    const idx = projects.value.findIndex(p => p.id === project.id)
    if (idx !== -1) {
      projects.value[idx] = JSON.parse(JSON.stringify(project))
    } else {
      projects.value.push(JSON.parse(JSON.stringify(project)))
    }
    persist()
  }

  // 删除项目
  function removeProject(id) {
    const idx = projects.value.findIndex(p => p.id === id)
    if (idx !== -1) {
      projects.value.splice(idx, 1)
      persist()
    }
  }

  // 新增项目
  function addProject(project) {
    projects.value.push(JSON.parse(JSON.stringify(project)))
    persist()
  }

  // 按 id 查
  function getProjectById(id) {
    return projects.value.find(p => p.id === Number(id))
  }

  // 写入 localStorage
  function persist() {
    localStorage.setItem('projects', JSON.stringify(projects.value))
  }

  // 从 localStorage 读
  function loadProjects() {
    const raw = localStorage.getItem('projects')
    if (raw) {
      try {
        return JSON.parse(raw)
      } catch (e) {
        console.warn('projects 数据解析失败，使用默认值')
      }
    }
    // 默认数据
    return [
      {
        id: 1,
        title: '个人主页',
        description: '基于 Vue3 + 组合式 API 开发的个人主页，支持编辑资料、主题切换、关键字搜索。',
        status: '已完成',
        tags: ['Vue3', 'Vite', 'CSS3'],
        link: '#'
      },
      {
        id: 2,
        title: '待办事项 App',
        description: '支持增删改查、本地存储、拖拽排序的待办清单，练习了状态管理与数组操作。',
        status: '已完成',
        tags: ['Vue3', 'localStorage'],
        link: '#'
      },
      {
        id: 3,
        title: '天气预报小程序',
        description: '调用公开天气 API，展示未来 7 天预报，正在学习 axios 与异步数据渲染。',
        status: '进行中',
        tags: ['Vue3', 'Axios', 'API'],
        link: '#'
      },
      {
        id: 4,
        title: '校园二手交易平台',
        description: '课程设计项目，前后端分离，使用 Node.js + Express 提供接口。',
        status: '计划中',
        tags: ['Vue3', 'Node.js', 'MySQL'],
        link: '#'
      }
    ]
  }

  return {
    // state
    name, studentId, className, avatarUrl, bio, skills, hobbies, projects,
    // getters
    projectCount, doneCount,
    // actions
    updateProfile, saveProject, removeProject, addProject, getProjectById
  }
})