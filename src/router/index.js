import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/homePage.vue'),
    },
    {
      path: '/allTasks',
      name: 'allTasks',
      component: () => import('../components/AllTasks.vue'),
    },
    {
      path: '/addTasks',
      name: 'addTasks',
      component: () => import('../components/AddTaskView.vue'),
    },
    {
      path: '/deleteTasks',
      name: 'deleteTasks',
      component: () => import('../components/deleteTasks.vue'),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../components/Signin.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/Login.vue'),
    },
  ],
})

export default router
