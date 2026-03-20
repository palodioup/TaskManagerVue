<template>
  <div>
    <div class="page-container">
      <div class="form-card">
        <header>
          <h2>Welcome to Task Manager</h2>
          <p>Manage your tasks efficiently and effortlessly.</p>
        </header>

        <div class="button-group">
          <button class="btn-primary">
            <a href="/allTasks">View All Tasks</a>
          </button>
          <button class="btn-primary">
            <a href="/addTasks">Add New Task</a>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: center; /* Horizontal center */
  align-items: center;     /* Vertical center */
  padding: 20px;
  margin-left:80px;
  margin-top: 50px;
  height: 70vh;
}



.page-container {
  padding: 40px;           /* More padding for a better look */
  display: flex;
  flex-direction: column;  /* Stack items vertically */
  align-items: center;     /* Center items inside the card */
  background-color: #ffffff;
  color: black;
  border: 1px solid #e2e8f0; /* Thinner, modern border */
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); /* Subtle shadow for depth */
}

.button-group button {
    margin: 10px;
    padding: 10px 20px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    text-decoration: none;
    margin-bottom: 40px;
}

a {
  text-decoration: none;
  color: #e2e8f0;
}
</style>
