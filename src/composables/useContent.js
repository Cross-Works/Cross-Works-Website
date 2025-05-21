import { ref, computed, provide } from 'vue'
import { useFetch } from './useFetch'

const ContentSymbol = Symbol('content')

// Mock data for development
const MOCK_POSTS_DATA = {
  data: [
    {
      id: 1,
      attributes: {
        title: "Mock Post 1",
        content: "This is a mock post for development",
        publishedAt: "2023-04-15T10:00:00.000Z",
        categories: [
          { slug: "news" },
          { slug: "tech" }
        ]
      }
    },
    {
      id: 2,
      attributes: {
        title: "Mock Post 2",
        content: "Another mock post for development",
        publishedAt: "2023-05-20T14:30:00.000Z",
        categories: [
          { slug: "news" }
        ]
      }
    }
  ]
};

/**
 * Groups items by their category slug
 * @template T
 * @param {Array<T>} items - Array of items with categories property
 * @returns {Object<string, Array<T>>} - Items grouped by category
 */
function groupByCategory(items) {
  if (!items || !Array.isArray(items)) return {}
  
  return items.reduce((acc, item) => {
    try {
      if (item.attributes?.categories) {
        item.attributes.categories.forEach(cat => {
          if (!acc[cat.slug]) acc[cat.slug] = []
          acc[cat.slug].push({
            ...item.attributes,
            id: item.id
          })
        })
      }
    } catch (e) {
      console.warn('Error processing item in groupByCategory:', e)
    }
    return acc
  }, {})
}

export function provideContent() {
  // Fetch data from Strapi with fallback mock data
  const { data: cardData, loading: loadingCards, error: errorCards } = 
    useFetch('http://localhost:1337/api/posts?populate=*', {
      fallbackData: MOCK_POSTS_DATA
    })
  
  // Since text-media-blocks doesn't exist in new backend, use empty data
  const blockData = ref({ data: [] })
  const loadingBlocks = ref(false)
  const errorBlocks = ref(null)

  // Computed properties to group by category
  const cardsByCategory = computed(() => 
    cardData.value?.data ? groupByCategory(cardData.value.data) : {}
  )

  const blocksByCategory = computed(() => ({}))  // Empty since we don't have blocks anymore

  // Combined loading and error states
  const loading = computed(() => loadingCards.value)
  const error = computed(() => errorCards.value)

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
  return {
    ContentSymbol
  }
} 