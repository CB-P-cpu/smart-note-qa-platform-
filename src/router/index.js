import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/user'

const routes = [
  { path: '/', redirect: '/notes' },
  { path: '/login', component: () => import('@/views/Login.vue') },
  { path: '/notes', component: () => import('@/views/NoteList.vue') },
  { path: '/note/edit/:id?', component: () => import('@/views/NoteEdit.vue') },
  { path: '/note/:id', component: () => import('@/views/NoteDetail.vue') },
  { path: '/ai-chat', component: () => import('@/views/AiChat.vue') },
  { path: '/favorites', component: () => import('@/views/Favorite.vue') },
  { path: '/stats', component: () => import('@/views/Stats.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.path === '/login') {
    next()
  } else {
    if (userStore.token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
