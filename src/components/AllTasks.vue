<template>
  <div class="tasks-container">
    <h2>All Tasks</h2>

    <p v-if="tasks.length === 0" class="empty-text">
      No tasks available
    </p>

    <table v-else class="tasks-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.dueDate }}</td>
          <td>{{ task.priority }}</td>
          <td>{{ task.status }}</td>
          <td class="editdelete">
            <button class="action-btn" @click="deleteTask(task.id)">
              Delete
            </button>
            <button class="action-btn2" @click="editTask(task.id)">
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="specialdivcontainer">
    <a href="/addTasks" class="add-btn">Add New Task</a>
    <a href="/deleteTasks" class="add-btn2">Delete All Tasks</a>
  </div>

  <!-- EDIT MODAL -->
  <div
    v-if="showEditModal"
    class="modal-overlay"
    @click.self="closeEditModal"
  >
    <div class="modal">
      <div class="modal-header">
        <h2>Update Task</h2>
        <button class="btn-close" @click="closeEditModal">&times;</button>
      </div>

      <div class="modal-body">
        <div class="form-group">
          <label>Status</label>
          <select v-model="editForm.status">
            <option value="To do">To do</option>
            <option value="In progress">In progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div class="form-group">
          <label>Due Date</label>
          <input
            type="text"
            v-model="editForm.dueDate"
            placeholder="e.g. Today, Tomorrow"
          />
        </div>

        <div class="form-group">
          <label>Description</label>
          <input
            type="text"
            v-model="editForm.description"
            placeholder="Enter task description"
          />
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn-cancel" @click="closeEditModal">
          Cancel
        </button>
        <button class="btn-save" @click="updateTask">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const tasks = ref([])
const showEditModal = ref(false)

const editForm = ref({
  id: null,
  status: '',
  dueDate: '',
  description: '',
})

/* ------------------ FETCH TASKS ------------------ */
onMounted(async () => {
  try {
    const res = await fetch('http://localhost:8080/tasks')
    tasks.value = await res.json()
  } catch (err) {
    console.error('Fetch error:', err)
    tasks.value = []
  }
})

/* ------------------ EDIT ------------------ */
const editTask = (id) => {
  const task = tasks.value.find(t => t.id === id)
  if (!task) return

  editForm.value = { ...task }
  showEditModal.value = true
}

/* ------------------ UPDATE ------------------ */
const updateTask = async () => {
  if (!editForm.value.id) return

  try {
    const res = await fetch(
      `http://localhost:8080/tasks/${editForm.value.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editForm.value.status,
          dueDate: editForm.value.dueDate,
          description: editForm.value.description,
        }),
      }
    )

    if (!res.ok) throw new Error('Update failed')

    const index = tasks.value.findIndex(
      t => t.id === editForm.value.id
    )

    if (index !== -1) {
      tasks.value[index] = {
        ...tasks.value[index],
        status: editForm.value.status,
        dueDate: editForm.value.dueDate,
        description: editForm.value.description,
      }
    }

    closeEditModal()
  } catch (err) {
    console.error(err)
    alert('Failed to update task')
  }
}

/* ------------------ DELETE ------------------ */
const deleteTask = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:8080/tasks/${id}`,
      { method: 'DELETE' }
    )

    if (!res.ok) throw new Error('Delete failed')

    tasks.value = tasks.value.filter(t => t.id !== id)
  } catch (err) {
    console.error(err)
    alert('Failed to delete task')
  }
}

/* ------------------ CLOSE MODAL ------------------ */
const closeEditModal = () => {
  showEditModal.value = false
  editForm.value = {
    id: null,
    status: '',
    dueDate: '',
    description: '',
  }
}
</script>
<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.editStatus {
  width: 100px;
}

.specialdivcontainer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.tasks-container {
  padding: 20px;
  color: black;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 80rem !important;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
}

section {
  display: flex;
  gap: 1rem;
  padding: 10px;
}

.tasks-container {
  width: 100%;
  margin: auto;
  font-family: Arial, sans-serif;
}

.tasks-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  background: white;
  border-radius: 6px;
  overflow: hidden;
}

.tasks-table th {
  background: #2c3e50;
  color: white;
  text-align: left;
  padding: 12px;
}

.tasks-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

.editdelete {
  width: 125px;
  height: 100px;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tasks-table tr:nth-child(even) {
  background: #f8f8f8;
}

.tasks-table tr:hover {
  background: #eef6ff;
}

.buttondiv {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 0px;
  border: 1px solid blue;
}

.add-btn {
  display: inline-block;
  margin-top: 20px;
  text-decoration: none;
  background: #3498db;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
}

.add-btn2 {
  display: inline-block;
  margin-top: 20px;
  text-decoration: none;
  background: red;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
}

.action-btn {
  display: inline-block;
  text-decoration: none;
  background: red;
  color: white;
  padding: 7px 4.5px;
  border-radius: 4px;
  width: 50px;
  border: none;
}

.action-btn a,
.action-btn2 a {
  color: white;
}

.action-btn2 {
  display: inline-block;
  text-decoration: none;
  background: green;
  color: white;
  padding: 7px 4.5px;
  border-radius: 4px;
  width: 50px;
  border: none;
}

.add-btn:hover {
  background: #1d6fa5;
}
.add-btn2:hover {
  background: #a50000;
}
.empty-text {
  color: #777;
  font-style: italic;
}
.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-update,
.btn-delete {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.15s ease;
}

.btn-update {
  background: #4c7cf3;
  color: #fff;
}

.btn-update:hover {
  background: #355ec1;
  transform: translateY(-2px);
}

.btn-delete {
  background: #e74c3c;
  color: #fff;
}

.btn-delete:hover {
  background: #c0392b;
  transform: translateY(-2px);
}

.add-task-link {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.75rem 1.2rem;
  border-radius: 999px;
  background: #4c7cf3;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.add-task-link:hover {
  background: #355ec1;
  transform: translateY(-1px);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 450px;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e3e9f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  color: #1c2541;
  font-size: 1.4rem;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.8rem;
  color: #7a8fa6;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.btn-close:hover {
  color: #1c2541;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.2rem;
  width: 500px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #1c2541;
  font-weight: 600;
  font-size: 0.95rem;
}

.form-group select,
.form-group input {
  padding: 0.75rem;
  border: 2px solid #e3e9f5;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
  width: 80%;
}

.form-group select:focus,
.form-group input:focus {
  outline: none;
  border-color: #4c7cf3;
  box-shadow: 0 0 0 3px rgba(76, 124, 243, 0.1);
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #e3e9f5;
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.btn-cancel,
.btn-save {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.15s ease;
}

.btn-cancel {
  background: #e3e9f5;
  color: #1c2541;
}

.btn-cancel:hover {
  background: #d1d9e6;
}

.btn-save {
  background: #4c7cf3;
  color: #fff;
}

.btn-save:hover:not(:disabled) {
  background: #355ec1;
  transform: translateY(-2px);
}

.btn-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
