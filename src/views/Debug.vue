<template>
  <div class="debug-page">
    <h1>Debug Strapi Data</h1>
    
    <div class="api-tester">
      <h2>API Tester</h2>
      <div class="form-group">
        <label for="endpoint">API Endpoint:</label>
        <input 
          id="endpoint" 
          v-model="apiEndpoint" 
          class="input" 
          placeholder="/api/global?populate=deep"
        />
        <button @click="fetchApi" class="button" :disabled="apiLoading">
          {{ apiLoading ? 'Loading...' : 'Fetch' }}
        </button>
      </div>
      
      <div v-if="apiError" class="error">
        Error: {{ apiError }}
      </div>
      
      <div v-if="apiData" class="result">
        <h3>API Response</h3>
        <pre>{{ JSON.stringify(apiData, null, 2) }}</pre>
      </div>
    </div>
    
    <hr>
    
    <div class="navigation-section">
      <h2>Navigation Links</h2>
      <div v-if="navLoading">Loading navigation...</div>
      <div v-else-if="navError">Error loading navigation: {{ navError }}</div>
      <div v-else>
        <h3>Processed Navigation Links</h3>
        <pre>{{ JSON.stringify(navLinks, null, 2) }}</pre>
        
        <h3>Raw Navigation Data</h3>
        <pre>{{ JSON.stringify(navRawData.value, null, 2) }}</pre>
      </div>
    </div>
    
    <hr>
    
    <div class="global-data">
      <h2>Global Data Provider</h2>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">Error: {{ error }}</div>
      <div v-else class="debug-content">
        <h3>Navigation Links (from Global Provider)</h3>
        <pre>{{ JSON.stringify(navigation, null, 2) }}</pre>
        
        <h3>Site Info</h3>
        <pre>{{ JSON.stringify(siteInfo, null, 2) }}</pre>
        
        <h3>Raw Data Structure</h3>
        <pre>{{ JSON.stringify(dataStructure, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGlobalData } from '../composables/useGlobal'
import { useStrapiDirect } from '../composables/useStrapiDirect'
import { useNavigation } from '../composables/useNavigation'

// Get all global data including debug data
const { navigation, siteInfo, loading, error, dataStructure } = useGlobalData()

// Direct API testing
const apiEndpoint = ref('/api/global?populate=deep')
const { data: apiData, error: apiError, loading: apiLoading, refetch: fetchApi } = useStrapiDirect(apiEndpoint.value)

// Get navigation data from dedicated composable
const { links: navLinks, loading: navLoading, error: navError, rawData: navRawData } = useNavigation()

// Update API endpoint and refetch when the endpoint changes
function updateEndpoint() {
  fetchApi()
}
</script>

<style scoped>
.debug-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1, h2, h3 {
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  gap: 10px;
}

.input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.button {
  background-color: #45B5AA;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
}

.button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: #e74c3c;
  margin-bottom: 1rem;
  padding: 10px;
  background-color: #fde2e2;
  border-radius: 4px;
}

pre {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  overflow: auto;
  max-height: 400px;
  margin-bottom: 2rem;
}

hr {
  margin: 2rem 0;
  border: 0;
  border-top: 1px solid #eee;
}
</style> 