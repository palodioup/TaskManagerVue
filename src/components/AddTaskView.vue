<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const taskTitle = ref('')
const taskDescription = ref('')
const error = ref('')
const taskStatus = ref('To do')
const taskDueDate = ref('')
const taskPriority = ref('medium')
const isLoading = ref(false)


// ---- Add Task (Handles both Title and Description) ----
const addTask = async () => {
  if (!taskTitle.value.trim()) {
    error.value = 'Please enter a task title'
    return
  }

  if (!taskDescription.value.trim()) {
    error.value = 'Please enter a task description'
    return
  }

  if (taskTitle.value.trim().length > 50) {
    error.value = 'Task title cannot exceed 50 characters'
    return
  }

  if (taskDescription.value.trim().length > 500) {
    error.value = 'Task description cannot exceed 500 characters'
    return
  }

  isLoading.value = true
  error.value = '' 

  try {
    const response = await fetch('http://localhost:8080/addTasks', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        taskTitle: taskTitle.value,        
        taskDescription: taskDescription.value,
        taskStatus: taskStatus.value,
        taskDueDate: taskDueDate.value,
        taskPriority: taskPriority.value
      }),
    })

    if (response.ok) {
      // If successful, navigate to all tasks and clear inputs
      taskTitle.value = ''
      taskDescription.value = ''
      taskDueDate.value = ''
      taskPriority.value = 'medium'
      taskStatus.value = 'to do'
      router.push('/allTasks')
    } else {
      const errorData = await response.json();
      error.value = errorData.error || 'Failed to save task.';
    }
  } catch (err) {
    error.value = 'Server is not running. Check your terminal!' 
    console.error("Fetch error:", err);
  } finally {
    isLoading.value = false
  }
}

const deleteTask = async () => {
    try {
        const response = await fetch('http://localhost:8080/deletetasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            alert('All tasks deleted successfully!');
            router.push('/allTasks');
        } else {
            const errorData = await response.json();
            error.value = errorData.error || 'Failed to delete all tasks.';
        }
    } catch (err) {
        error.value = 'Server is not running or delete request failed.';
        console.error("Delete all tasks error:", err);
    }
};

</script>

<template>
 <div class="daddy">
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
      <div class="input-group">
        <label>Status</label>
        <input
          type="text"
          placeholder="e.g. Finish the project report"
          v-model="taskStatus"
          @keyup.enter="addTask"
          :disabled="isLoading"
        />
      </div>
      <div class="input-group">
        <label>Priority/Importance</label>
        <select class="p" v-model="taskPriority">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div class="input-group">
        <label>Due Date</label>
        <select class="d" v-model="taskDueDate">
          <option value="Today">Today</option>
          <option value="Tomorrow">Tomorrow</option>
          <option value="This Week">This Week</option>
          <option value="Next Week">Next Week</option>
          <option value="No Due Date">No Due Date</option>
        </select>
      </div>
      <div class="input-group">
        <label>Task Description</label>
        <textarea
          type="text"
          placeholder="e.g. Finish it after dinner today"
          v-model="taskDescription"
          @keyup.enter="addTask"
          :disabled="isLoading"
        />
      </div>

      <p v-if="error" class="error-msg">{{ error }}</p>

      <div class="actions">
        <!-- The Cancel button takes you back home -->
        <button class="btn-secondary" @click="router.push('/allTasks')" :disabled="isLoading">Cancel</button>
        <button class="btn-primary" @click="addTask" :disabled="isLoading">
          {{ isLoading ? 'Saving...' : 'Create Task' }}
        </button>
        <!-- Removed the separate addTaskDesc button as it's now handled by addTask -->

        <button class="btn-primary" @click="deleteTask" :disabled="isLoading">
          Delete All Tasks
        </button>
      </div>
    </div>
  </div>
 </div>
</template>

<style scoped>
.daddy{ 
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: linear-gradient(45deg, rgb(2, 0, 20), rgb(9, 0, 32), rgb(11, 0, 47));
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Your existing styles remain unchanged */
.page-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
  border-radius: 10px;
  margin: 15px;
}

textarea {
  padding: 10px;
  border: 2px #031329 solid;
  border-radius: 10px;
  border: 0 4px 6px -1px #031329;
  height: 200px;
}

.form-card {
  background: white;
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

header h2 {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
  color: #031329;
}
header p {
  color: #031329;
  margin: 0.5rem 0 2rem 0;
  font-size: 0.9rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.input-group label {
  font-size: 0.85rem;
  font-weight: 700;
  color: #1e293b;
}

input {
  padding: 0.8rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #4f46e5;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-primary,
.btn-secondary {
  position: relative; /* Required for the pseudo-element */
    z-index: 1;
    padding: 10px 20px;
    cursor: pointer;
    color: white;
    border: 4px solid transparent;
    border-radius: 10px;
    font-size: 12px;
    /* Initial Background */
    background: linear-gradient(45deg, rgb(11, 0, 47), rgb(14, 0, 30), rgb(11, 0, 47)) padding-box, 
                linear-gradient(45deg, #2e0053, #400173, #5d04a6, rgb(11, 0, 47), rgb(14, 0, 30), rgb(11, 0, 47)) border-box;

}

.btn-primary::before,
.btn-secondary::before {
  content: "";
    position: absolute;
    top: -2px; left: -2px; right: -2px; bottom: -2px; /* Stretch to cover border */
    z-index: -1;
    border-radius: 10px;
    /* Hover Background */
    background: linear-gradient(45deg, rgb(11, 0, 47), rgb(29, 0, 63), rgb(11, 0, 47)) padding-box, 
                linear-gradient(45deg, rgb(14, 0, 30), rgb(11, 0, 47), rgb(11, 0, 47), #2e0053, #400173, #5d04a6) border-box;
    opacity: 0;
    transition: opacity 0.5s ease;
}

.btn-primary:hover::before,
.btn-secondary:hover::before {
  opacity: 1;
}

.error-msg {
  color: #ef4444;
  font-size: 0.85rem;
  margin-top: 1rem;
  text-align: center;
}

a {
  text-decoration: none;
  color: #f1f5f9;
}

.p, .d{
  padding: 10px;
   border: 2px solid #e2e8f0;
   border-radius: 10px;
}
</style>
