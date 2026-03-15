<template>
  <div>
    <h2>All Tasks</h2>
    <p v-if="tasks.length === 0">Loading...</p>
    <ul>
      <li v-for="task in tasks">
        {{ task }}
      </li>
    </ul>
    <a href="/addTasks"> Add New Task </a>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const tasks = ref([])

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8080/tasks')
    const data = await response.json()
    tasks.value = data
  } catch (error) {
    console.error('Error fetching tasks:', error)
    tasks.value = ['No tasks available']
  }
})
</script>

<style scoped>
div {
  padding: 20px;
  color: black;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin-left: 545px;
  margin-top: 50px;
}
</style>
