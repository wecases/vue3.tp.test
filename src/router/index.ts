import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router'
import type { App } from 'vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/general',
  },
  {
    path: '/general',
    name: 'general',
    component: () => import('@/views/index.vue'),
  },
  {
    path: '/anime',
    name: 'anime',
    component: () => import('@/views/anime/index.vue'),
  },
  {
    path: '/people',
    name: 'people',
    component: () => import('@/views/people/index.vue'),
  },
  {
    path: '/details/:id',
    name: 'details',
    component: () => import('@/views/details/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export const initRouter = (app: App<Element>) => {
  app.use(router)
}
