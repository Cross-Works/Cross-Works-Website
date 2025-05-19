import { ref, computed, provide, inject } from 'vue'
import useFetch from './useFetch'

const ContentSymbol = Symbol('Content')

/**
 * Groups items by their category slug
 * @template T
 * @param {Array<T>} items - Array of items with categories property
 * @returns {Object<string, Array<T>>} - Items grouped by category
 */
function groupByCategory(items) {
  return items?.reduce((acc, item) => {
    item.categories.forEach(cat => {
      if (!acc[cat.slug]) acc[cat.slug] = []
      acc[cat.slug].push(item)
    })
    return acc
  }, {}) || {}
}

export function provideContent() {
  // Fetch data from Strapi
  const { data: cardData, loading: loadingCards, error: errorCards } = 
    useFetch('http://localhost:1337/api/cards?populate=*')
  
  const { data: blockData, loading: loadingBlocks, error: errorBlocks } = 
    useFetch('http://localhost:1337/api/text-media-blocks?populate=*')

  // Computed properties to group by category
  const cardsByCategory = computed(() => 
    cardData.value?.data ? groupByCategory(cardData.value.data) : {}
  )

  const blocksByCategory = computed(() => 
    blockData.value?.data ? groupByCategory(blockData.value.data) : {}
  )

  // Combined loading and error states
  const loading = computed(() => loadingCards.value || loadingBlocks.value)
  const error = computed(() => errorCards.value || errorBlocks.value)

  // Create the content object
  const content = {
    cards: cardsByCategory,
    blocks: blocksByCategory,
    loading,
    error
  }

  // Provide the content
  provide(ContentSymbol, content)

  return content
}

export function useContent() {
  const content = inject(ContentSymbol)
  if (!content) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return content
} 