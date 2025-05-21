import { ref, watchEffect } from 'vue'
import axios from 'axios'

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_KEY = '8861150253f51cd7bcead9f1c8475c53f4893e0044d98ecacaba04a5131d85f71c01cfbbc9bb765a8acdd7d48108565c0544b7d10c26815bfa42c07d7f08a2c63a9ce8454f437dbd9f622155c328bab02df6c4b1215cf8f2b970a5f25590a31fb006ae790a69fbe76255b638d1fa724b381551b8f7a41f6e9e9db04c7c7b7d73'

export function useFetch(endpoint, options = {}) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(true)

  const fetchData = async () => {
    loading.value = true
    
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
      
      const response = await axios.get(url, {
        headers,
        params: options.params || {}
      })

      data.value = response.data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred while fetching data'
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error, loading, refetch: fetchData }
} 