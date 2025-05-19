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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import CardGrid from '../components/Cards/CardGrid.vue'
import { useContent, provideContent } from '../composables/useContent'
import useTheme from '../composables/useTheme'

const { setTheme } = useTheme()

onMounted(() => {
  setTheme('xw-grey')
})


// Get news cards from content
const news = computed(() => content.cards.value?.news || [])
</script> 