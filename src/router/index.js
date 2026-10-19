import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/projects',
    component: () => import('../views/ProjectsView.vue'),
    meta: { title: '项目中心' },
    children: [
      {
        path: '',
        name: 'ProjectList',
        component: () => import('../views/ProjectListView.vue'),
        meta: { title: '项目列表' }
      },
      {
        path: ':id',
        name: 'ProjectDetail',
        component: () => import('../views/ProjectDetailView.vue'),
        meta: { title: '项目详情' }
      }
    ]
  },
  // ★ 新增：文章列表 + 详情
  {
    path: '/articles',
    component: () => import('../views/ArticleListView.vue'),
    meta: { title: '我的文章' }
  },
  {
    path: '/articles/:id',
    name: 'ArticleDetail',
    component: () => import('../views/ArticleDetailView.vue'),
    meta: { title: '文章详情' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { title: '关于' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/admin',
    component: () => import('../views/AdminView.vue'),
    meta: { title: '后台管理', requiresAuth: true },
    children: [
      { path: '', redirect: '/admin/profile' },
      {
        path: 'profile',
        name: 'AdminProfile',
        component: () => import('../views/AdminProfileView.vue'),
        meta: { title: '编辑个人简介' }
      },
      {
        path: 'projects',
        name: 'AdminProject',
        component: () => import('../views/AdminProjectView.vue'),
        meta: { title: '编辑项目信息' }
      },
      // ★ 新增：后台编辑文章
      {
        path: 'articles',
        name: 'AdminArticle',
        component: () => import('../views/AdminArticleView.vue'),
        meta: { title: '编辑文章' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: '页面不存在' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || '我的主页'} - 邓斯予的个人主页`
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    console.warn('⚠️ 未登录，跳转到登录页')
    next('/login')
  } else if (to.path === '/login' && userStore.isLoggedIn) {
    next('/admin')
  } else {
    next()
  }
})

export default router