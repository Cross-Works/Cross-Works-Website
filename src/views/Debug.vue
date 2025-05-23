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
          placeholder="/api/homepage?populate=*"
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
      <div v-if="strapiStore.loading.global">Loading navigation...</div>
      <div v-else-if="strapiStore.errors.global">Error loading navigation: {{ strapiStore.errors.global }}</div>
      <div v-else>
        <h3>Processed Navigation Links</h3>
        <pre>{{ JSON.stringify(strapiStore.navigation, null, 2) }}</pre>
        
        <h3>Raw Global Data</h3>
        <pre>{{ JSON.stringify(strapiStore.globalData, null, 2) }}</pre>
      </div>
    </div>
    
    <hr>
    
    <div class="homepage-section">
      <h2>Homepage Data</h2>
      <div v-if="strapiStore.loading.homepage">Loading homepage...</div>
      <div v-else-if="strapiStore.errors.homepage">Error loading homepage: {{ strapiStore.errors.homepage }}</div>
      <div v-else>
        <h3>Processed Cards</h3>
        <pre>{{ JSON.stringify(strapiStore.homepageCards, null, 2) }}</pre>
        
        <h3>Cards Title</h3>
        <pre>{{ JSON.stringify(strapiStore.homepageCardsTitle, null, 2) }}</pre>
        
        <h3>Featured Media</h3>
        <pre>{{ JSON.stringify(strapiStore.featuredMedia, null, 2) }}</pre>
        
        <h3>Raw Homepage Data</h3>
        <pre>{{ JSON.stringify(strapiStore.homepageData, null, 2) }}</pre>
      </div>
    </div>

    <hr>
    
    <div class="global-data">
      <h2>Site Info & Other Data</h2>
      <div v-if="strapiStore.loading.global">Loading...</div>
      <div v-else-if="strapiStore.errors.global">Error: {{ strapiStore.errors.global }}</div>
      <div v-else class="debug-content">
        <h3>Site Info</h3>
        <pre>{{ JSON.stringify(strapiStore.siteInfo, null, 2) }}</pre>
        
        <h3>Footer Data</h3>
        <pre>{{ JSON.stringify(strapiStore.footer, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStrapiStore } from '../stores/strapi'
import { useStrapiDirect } from '../composables/useStrapiDirect'

// Get the Strapi store
const strapiStore = useStrapiStore()

// Direct API testing
const apiEndpoint = ref('/api/homepage?populate=*')
const { data: apiData, error: apiError, loading: apiLoading, refetch: fetchApi } = useStrapiDirect(apiEndpoint.value)

// Initialize store data
strapiStore.initialize()

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