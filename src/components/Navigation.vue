<template>
  <nav>
    <ul>
      <template v-if="links && links.length">
        <li v-for="(link, index) in links" :key="index">
          <a v-if="link.isExternal" :href="link.url" target="_blank" rel="noopener">{{ link.text }}</a>
          <router-link v-else :to="link.url">{{ link.text }}</router-link>
        </li>
      </template>
      <template v-else>
        <!-- Fallback navigation if no data from API -->
        Failed
      </template>
    </ul>
  </nav>
</template>

<script setup>
import { useNavigation } from '../composables/useNavigation'

// Get navigation links using our specialized composable
const { links } = useNavigation()
</script>

<style lang="scss" scoped>
@use '../assets/scss/variables' as *;
@use '../assets/scss/templates' as *;

nav ul {
  display: flex;
  list-style: none;
  gap: $spacing-xl;
  margin-left: auto; 
  margin-right: auto;
  z-index: 1000;

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