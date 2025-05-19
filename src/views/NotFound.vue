<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Page not found</p>
    <router-link to="/">Return to Home</router-link>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  text-align: center;
}

h1 {
  font-size: 6rem;
  margin-bottom: 0;
  color: #666;
}

p {
  font-size: 1.5rem;
  margin: 1rem 0 2rem;
}

a {
  padding: 0.5rem 1rem;
  background-color: #42b883;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
}

a:hover {
  background-color: #359469;
}
</style> 