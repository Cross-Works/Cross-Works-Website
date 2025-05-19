<template>
    <nav>
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
@import '../assets/scss/variables';
nav ul {
    display: flex;
    list-style: none;
    gap: $spacing-xl;
    
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