<template>
  <div class="panel-cities">
    <h1>Our Cities</h1>
    <div v-if="loading" class="loading">Loading city information...</div>
    <div v-else-if="error" class="error">Error loading cities data</div>
    <div v-else class="cities-grid">
      <CardGrid
        title="Featured Cities"
        :cards="cities"
        :show-description="true"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import CardGrid from '../Cards/CardGrid.vue'
import { useContent, provideContent } from '../../composables/useContent'

// Setup content provider
const content = provideContent()

// Get cities from content
const cities = computed(() => content.cards.value?.cities || [])
const loading = computed(() => content.loading.value)
const error = computed(() => content.error.value)
</script>

<style lang="scss" scoped>
@use '../../assets/scss/variables' as *;

.panel-cities {
  max-width: 1200px;
  margin: 0 auto;
  padding: $spacing-xl;
  background-color: $xw-teal-medium;
  
  h1 {
    margin-bottom: $spacing-xl;
    text-align: center;
    font-weight: bold;
    color: $xw-white;
    
    &:after {
      content: '';
      display: block;
      width: 50px;
      height: 3px;
      background-color: $primary-color;
      margin: $spacing-sm auto 0;
    }
  }
  
  .cities-grid {
    margin-top: $spacing-lg;
  }
  
  .loading, .error {
    text-align: center;
    padding: $spacing-xxl;
    color: $medium;
    
    &.error {
      color: $error;
    }
  }
}
</style> 