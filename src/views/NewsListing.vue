<template>
  <div>
    <CardGrid
      title="Latest News"
      :cards="news"
      link-prefix="/news/"
      :show-date="true"
      :show-description="true"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import CardGrid from '../components/Cards/CardGrid.vue'
import { useContent, provideContent } from '../composables/useContent'

// Setup content provider
const content = provideContent()

// Get news cards from content
const news = computed(() => content.cards.value?.news || [])
</script> 