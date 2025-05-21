import { ref, watchEffect } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

/**
 * Direct access to Strapi API for debugging
 * @param {string} endpoint - API endpoint (e.g., '/api/global')
 * @param {object} options - Additional options (params, headers)
 */
export function useStrapiDirect(endpoint, options = {}) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(true)

  const fetchData = async () => {
    loading.value = true
    error.value = null
    
    try {
      console.log(`Fetching from: ${API_URL}${endpoint}`)
      const response = await axios.get(`${API_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        params: options.params || {}
      })
      data.value = response.data
      console.log('API Response:', response.data)
    } catch (err) {
      console.error('Strapi API error:', err)
      error.value = err.response?.data?.error || err.message
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (endpoint) {
      fetchData()
    }
  })

  return { data, error, loading, refetch: fetchData }
} 