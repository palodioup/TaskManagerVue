<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const taskTitle = ref("");
const error = ref("");
const isLoading = ref(false);

const addTask = async () => {
  if (!taskTitle.value.trim()) {
    error.value = "Please enter a task title";
    return;
  }

  isLoading.value = true;
  error.value = "";

  try {
    // This sends the task to your Node server on port 8080
    const response = await fetch("http://localhost:8080/addTasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tasktitle: taskTitle.value })
    });

    if (response.ok) {
      // After success, it automatically takes you back to the list page
      // router.push('/');\
      router.push('/allTasks');
    } else {
      error.value = "Failed to save task.";
    }
  } catch (err) {
    error.value = "Server is not running. Check your terminal!";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="page-container">
    <div class="form-card">
      <header>
        <h2>Add New Task</h2>
        <p>What's on your mind today?</p>
      </header>

      <div class="input-group">
        <label>Task Title</label>
        <input 
          type="text" 
          placeholder="e.g. Finish the project report" 
          v-model="taskTitle" 
          @keyup.enter="addTask"
          :disabled="isLoading"
        />
      </div>

      <p v-if="error" class="error-msg">{{ error }}</p>

      <div class="actions">
        <!-- The Cancel button takes you back home -->
        <button class="btn-secondary" @click="router.push('/allTasks')">Cancel</button>
        <button class="btn-primary" @click="addTask" :disabled="isLoading">
          {{ isLoading ? 'Saving...' : 'Create Task' }}
        </button>
        <button class="btn-primary" @click="deleteTask" :disabled="isLoading">
         <a href="/deleteTasks">Delete All Tasks</a>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  margin-left: 430px;
  align-items: center;
  background-color: #f8fafc;

}

.form-card {
  background: white;
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);

}

header h2 { font-size: 1.5rem; font-weight: 800; margin: 0; color: #031329;}
header p { color: #031329; margin: 0.5rem 0 2rem 0; font-size: 0.9rem; }

.input-group { display: flex; flex-direction: column; gap: 0.5rem; }
.input-group label { font-size: 0.85rem; font-weight: 700; color: #1e293b; }

input {
  padding: 0.8rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus { outline: none; border-color: #4f46e5; }

.actions { display: flex; gap: 1rem; margin-top: 2rem; }

.btn-primary { background: #4f46e5; color: white; flex: 2; border: none; padding: 0.8rem; border-radius: 10px; font-weight: 700; cursor: pointer;}
.btn-secondary { background: #f1f5f9; color: #475569; flex: 1; border: none; padding: 0.8rem; border-radius: 10px; font-weight: 700; cursor: pointer;}

.error-msg { color: #ef4444; font-size: 0.85rem; margin-top: 1rem; text-align: center; }
</style>
