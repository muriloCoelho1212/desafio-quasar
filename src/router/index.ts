import {
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', name: 'viewVersions', component: () => import('pages/ViewPage.vue')
      },
      {
        path: 'form', name: 'formVersions', component: () => import('pages/FormPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
