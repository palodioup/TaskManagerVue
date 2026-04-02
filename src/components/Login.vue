
<template>
  <div class="container">
    <div class="form-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin" class="form">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" @click="login">Login</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
  /* Your existing styles... */
  .container {
    --formHeight: calc(1500px * 0.28);
    display: flex;
    justify-content: center;
    height: 100vh;
  }
  .form-container {
    border: 5px solid #0a3872;
    border-radius: 10px;
    padding: 20px;
    width: 1500px;
    color: black;
    margin: 20px;
  }
  .form {
    border: 2.5px #1762be solid;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    height: var(--formHeight);
  }
  .form div {
    margin-bottom: 15px;
  }
  .form label {
    display: block;
    margin-bottom: 5px;
  }
  .form button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    font-size: 1rem;
  }
</style>

<script setup>
// Code to check if inputted username and password match the stored values in localStorage
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const username = ref('');
const password = ref('');
    
const handleLogin = () => {
  try {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username.value === storedUsername && password.value === storedPassword) {
      alert('Login successful!');
      router.push('/addTasks'); // Redirect to home page after successful login
    } else {
      alert('Invalid username or password. Please try again.');
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
};
</script>