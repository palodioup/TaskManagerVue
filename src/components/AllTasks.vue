<template>
  <div>
    <span>
      <h2>All Tasks</h2>
      <p v-if="tasks.length === 0">No tasks available</p>
      <table>
        <tr v-for="task in tasks" :key="task.id">
          <td>Title: {{ task.title }}</td>
          <td>Description: {{ task.description }}</td>
        </tr>
      </table>
      <a href="/addTasks"> Add New Task </a>
    </span>
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
  width: 80rem !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 2px solid black;
}

tr {
  border-bottom: 1px solid black;
}

td {
  padding: 10px;
  text-align: left;
}

</style>
