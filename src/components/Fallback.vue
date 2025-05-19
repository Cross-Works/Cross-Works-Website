<template>
  <div class="fallback">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>
</template>

<style scoped>
.fallback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(66, 184, 131, 0.1);
  border-radius: 50%;
  border-top-color: #42b883;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

p {
  font-size: 1.2rem;
  color: #555;
}
</style> 