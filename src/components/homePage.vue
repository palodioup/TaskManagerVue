<template>
  <body>
    <header>
      <nav>
        <h1>Task Manager</h1>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/addTasks">Get Started</a></li>
          <li><a href="/allTasks">View all Tasks</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <div class="main">
        <div class="parent-container">
        <h1>Manage you tasks efficiently with Task Manager</h1>
      </div>
      </div>
      <span>
        <div class="link-btn-div">
        <button><a href="/addTasks">Add Task</a></button>
        <button><a href="/allTasks">View All Tasks</a></button>
      </div>
      </span>
    </main>
  </body>
</template>
<style scoped>
  * {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    box-sizing: border-box; /* Prevents padding from breaking widths */
  }

  header {
    background: linear-gradient(45deg, rgb(2, 0, 20), rgb(9, 0, 32), rgb(11, 0, 47));
    color: white;
    border-bottom: 0.1px white solid;
  }

  nav {
    display: flex;
    justify-content: space-between; /* Better than fixed margins */
    align-items: center;
    padding: 25px 50px;
  }

  ul {
    display: flex;
    list-style-type: none;
    gap: 40px; /* Modern way to space items */
  }

  ul li a {
    color: white;
    font-size: large;
    text-decoration: none;
  }

  main {
    width: 100%;
    background: linear-gradient(45deg, rgb(2, 0, 20), rgb(9, 0, 32), rgb(11, 0, 47));
    padding-bottom: 30px;
    min-height: 100vh;
  }

  .main {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .parent-container {
    margin-top: 50px;
    padding: 70px;
    width: 80%;
    background: linear-gradient(45deg, rgb(2, 0, 20), rgb(9, 0, 32), rgb(11, 0, 47));
    color: white;
    border: 4.5px white solid;
    border-radius: 10px;
    min-height: 600px;
    text-align: center;
  }

  .link-btn-div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
    margin: 50px auto 0;
    padding: 30px;
    width: 60%;
    border: 2px solid transparent;
    border-radius: 10px;
    background: linear-gradient(45deg, rgb(11, 0, 47), rgb(14, 0, 30), rgb(11, 0, 47)) padding-box,
                linear-gradient(45deg, rgb(5, 0, 30), rgb(45, 2, 114)) border-box;
  }

  /* THE TRANSITION FIX */
  .link-btn-div button {
    position: relative; /* Required for the pseudo-element */
    z-index: 1;
    padding: 10px 20px;
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 10px;
    /* Initial Background */
    background: linear-gradient(45deg, rgb(11, 0, 47), rgb(14, 0, 30), rgb(11, 0, 47)) padding-box, 
                linear-gradient(45deg, #2e0053, #400173, #5d04a6, rgb(11, 0, 47), rgb(14, 0, 30), rgb(11, 0, 47)) border-box;
  }

  /* The "Hover State" hidden by default */
  .link-btn-div button::before {
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

  .link-btn-div button:hover::before {
    opacity: 1;
  }

  .link-btn-div button a {
    color: white;
    text-decoration: none;
  }
</style>