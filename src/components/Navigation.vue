<template>
  <nav>
    <ul>
      <template v-if="strapiStore.navigation && strapiStore.navigation.length">
        <li v-for="(link, index) in strapiStore.navigation" :key="index">
          <a v-if="link.isExternal" :href="link.url" target="_blank" rel="noopener">{{ link.text }}</a>
          <router-link v-else :to="link.url">{{ link.text }}</router-link>
        </li>
      </template>
      <template v-else-if="strapiStore.loading.global">
        <li>Loading navigation...</li>
      </template>
      <template v-else-if="strapiStore.errors.global">
        <li>Error loading navigation</li>
      </template>
      <template v-else>
        <!-- Fallback navigation if no data from API -->
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </template>
    </ul>
  </nav>
</template>

<script setup>
import { useStrapiStore } from '../stores/strapi'
import { onMounted } from 'vue'

// Get the Strapi store
const strapiStore = useStrapiStore()

// Initialize data if needed
onMounted(async () => {
  if (!strapiStore.globalData) {
    await strapiStore.fetchGlobalData()
  }
})
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