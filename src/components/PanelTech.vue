<template>
  <div class="panel-tech">
    <h1>Technology Solutions</h1>
    <div v-if="loading" class="loading">Loading technology information...</div>
    <div v-else-if="error" class="error">Error loading technology data</div>
    <div v-else class="tech-grid">
      <CardGrid
        title="Our Technologies"
        :cards="tech"
        :show-description="true"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import CardGrid from './Cards/CardGrid.vue'
import { useContent, provideContent } from '../composables/useContent'

// Setup content provider
const content = provideContent()

// Get tech items from content
const tech = computed(() => content.cards.value?.tech || [])
const loading = computed(() => content.loading.value)
const error = computed(() => content.error.value)
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.panel-tech {
  max-width: 1200px;
  margin: 0 auto;
  padding: $spacing-xl;
  
  h1 {
    margin-bottom: $spacing-xl;
    text-align: center;
    font-weight: bold;
    color: $secondary-color;
    
    &:after {
      content: '';
      display: block;
      width: 50px;
      height: 3px;
      background-color: $primary-color;
      margin: $spacing-sm auto 0;
    }
  }
  
  .tech-grid {
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