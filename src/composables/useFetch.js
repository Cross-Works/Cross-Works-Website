import { ref, watchEffect } from 'vue'
import axios from 'axios'

export default function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(true)

  const fetchData = async () => {
    loading.value = true
    try {
      const response = await axios.get(url)
      data.value = response.data
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error, loading }
} 