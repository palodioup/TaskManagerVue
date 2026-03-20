<template>
  <div class="app-main">
    <RouterView />
  </div>
</template>

<style>
#app {
  display: block !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

body {
  margin: 0;
  background-color: #f8fafc;
}

.app-main {
  width: 100%;
  min-height: 100vh;
}
</style>
