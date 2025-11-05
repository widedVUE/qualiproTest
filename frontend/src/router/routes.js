import { useAuthStore } from 'src/stores/auth'

const requireAuth = (to, from, next) => {
  const store = useAuthStore()
  if (!store.token) return next('/login')
  next()
}

export default [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DashboardPage.vue'), beforeEnter: requireAuth }, //  Dashboard 
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') },
      { path: 'collaborateurs', component: () => import('pages/CollaborateursPage.vue'), beforeEnter: requireAuth }
    ]
  },
  { path: '/:catchAll(.*)*', redirect: '/' } // dashboard
]
