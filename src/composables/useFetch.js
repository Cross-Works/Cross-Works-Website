import { ref, watchEffect } from 'vue'
import axios from 'axios'

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_KEY = import.meta.env.VITE_STRAPI_API_KEY || null
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true'

export function useFetch(endpoint, options = {}) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(true)

  const fetchData = async () => {
    loading.value = true
    
    // If we're configured to use mock data, don't even try the API call
    if (USE_MOCK_DATA && options.fallbackData) {
      console.log(`Using mock data for ${endpoint} (configured in .env)`)
      data.value = options.fallbackData
      loading.value = false
      return
    }

    try {
      const headers = {
        'Content-Type': 'application/json',
        ...options.headers
      }

      // Add API key if available
      if (STRAPI_API_KEY) {
        headers['Authorization'] = `Bearer ${STRAPI_API_KEY}`
      }

      const url = endpoint.startsWith('http') ? endpoint : `${STRAPI_URL}${endpoint}`
      console.log(`Fetching from: ${url}`)

      const response = await axios.get(url, {
        headers,
        params: options.params || {}
      })

      data.value = response.data
    } catch (e) {
      console.error(`Error fetching ${endpoint}:`, e)
      error.value = e instanceof Error ? e.message : 'An error occurred while fetching data'
      
      // Add fallback data for development
      if (import.meta.env.DEV && options.fallbackData) {
        console.warn('Using fallback data in development mode')
        data.value = options.fallbackData
      }
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error, loading, refetch: fetchData }
} 