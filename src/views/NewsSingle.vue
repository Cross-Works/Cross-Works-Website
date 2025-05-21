<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error loading content</div>
  <div v-else-if="article" class="single-news">
    <header>
      <h1>{{ article.title }}</h1>
      <time v-if="article.publishedAt">{{ formatDate(article.publishedAt) }}</time>
    </header>
    
    <img 
      v-if="article.image" 
      :src="getImageUrl(article.image)" 
      :alt="article.image.alternativeText || ''"
      class="featured-image"
    />
    
    <div class="article-content">
      <template v-if="typeof article.content === 'string'">
        <p>{{ article.content }}</p>
      </template>
      <template v-else>
        <div v-for="(node, idx) in article.content" :key="idx">
          <p v-if="node.type === 'paragraph'">
            {{ getNodeText(node) }}
          </p>
        </div>
      </template>
    </div>
    
    <div class="back-link">
      <router-link to="/news">← Back to all news</router-link>
    </div>
  </div>
  <div v-else class="not-found">
    <h2>Article not found</h2>
    <router-link to="/news">Back to news</router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFetch } from '../composables/useFetch'

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'
const route = useRoute()
const articleId = computed(() => route.params.docId)

// Fetch the specific article
const { data, loading, error } = useFetch(`/api/posts/${articleId.value}?populate=*`)

// Extract article from response
const article = computed(() => {
  if (!data.value?.data) return null
  const attrs = data.value.data.attributes
  return {
    ...attrs,
    id: data.value.data.id,
    image: attrs.image?.data?.attributes,
    categories: attrs.categories?.data?.map(cat => cat.attributes) || []
  }
})

// Format date for display
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// Helper to get image URL
const getImageUrl = (image) => {
  if (!image?.url) return ''
  return image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`
}

// Helper to extract text from rich text nodes
const getNodeText = (node) => {
  return node.children?.map(c => c.text).join('') || ''
}
</script>

<style scoped>
.single-news {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

header {
  margin-bottom: 20px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

time {
  color: #666;
  font-size: 0.9rem;
}

.featured-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 20px;
}

.article-content {
  line-height: 1.6;
  font-size: 1.1rem;
}

.article-content p {
  margin-bottom: 1rem;
}

.back-link {
  margin-top: 40px;
}

.back-link a {
  color: #42b883;
  text-decoration: none;
}

.not-found {
  text-align: center;
  padding: 50px;
}
</style> 