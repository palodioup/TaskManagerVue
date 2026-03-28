<template>
    <button @click="deleteTasks"><a>Delete All Tasks</a></button>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const deleteTasks = async () => {
  try {
    const response = await fetch("http://localhost:8080/deletetasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    })

    if (response.ok) {
      router.push('/allTasks')
      alert("All tasks have been deleted!")
    } else {
      console.error("Failed to delete tasks")
    }
  } catch (error) {
    console.error("Error deleting tasks:", error)
  }
}
</script>

<style scoped>
    button {
        padding: 10px 20px;
        background-color: #ef4444;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        margin-left: 540px;
        margin-top: 50px;
    }
    
    button:hover {
        background-color: #dc2626;
    }

    a {
      text-decoration: none;
      color: white;
    }
</style>