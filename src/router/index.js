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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
      component: () => import('../components/deleteTask.vue'),
    }
  ],
})

export default router
