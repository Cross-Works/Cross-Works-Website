<template>
  <nav>
    <router-link to="/" class="logo">
      Logo
    </router-link>

    <ul>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/news">News</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style lang="scss" scoped>
@use '../assets/scss/variables' as *;
@use  '../assets/scss/templates' as *;

nav {
  display: flex;
  justify-content: space-between;

  border: 2px solid grey;
  z-index: 1000;
  position: fixed;

  .logo {
    border: 1px solid grey;
    padding-right: 20px;
  }
}

nav ul {
  display: flex;
  list-style: none;
  gap: $spacing-xl;
  margin-left: auto; 
  margin-right: auto;

  a {
    color: var(--theme-link);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
      color: var(--theme-link-hover);
    }
  }
}
</style>