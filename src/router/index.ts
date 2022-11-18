import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
  },
]
// import.meta.env.BASE_URL
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export const initRouter = (app: App<Element>) => {
  app.use(router)
}
