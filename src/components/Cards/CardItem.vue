<template>
  <article
    @click="handleClick"
    :style="[
      {
        cursor: linkPrefix ? 'pointer' : 'default',
        border: '1px solid #eee',
        borderRadius: '4px',
        overflow: 'hidden'
      },
      style
    ]"
  >
    <img
      v-if="card.image"
      :src="imageUrl"
      :alt="card.image.alternativeText || ''"
      style="width: 100%; height: 160px; object-fit: cover"
    />

    <div style="padding: 12px">
      <p
        v-if="showDate && card.publishedDate"
        style="margin: 0; font-size: 12px; color: #666"
      >
        {{ formatDate(card.publishedDate) }}
      </p>
      <h3 style="margin: 8px 0 0; font-size: 16px">{{ card.title }}</h3>
      <div v-if="showDescription && card.description">
        <template v-if="typeof card.description === 'string'">
          <p style="margin: 8px 0 0; font-size: 14px; color: #444">
            {{ card.description }}
          </p>
        </template>
        <template v-else>
          <div v-for="(node, idx) in card.description" :key="idx">
            <p
              v-if="node.type === 'paragraph'"
              style="margin: 8px 0 0; font-size: 14px; color: #444"
            >
              {{ getNodeText(node) }}
            </p>
          </div>
        </template>
      </div>
    </div>
  </article>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useRouter } from 'vue-router'

const STRAPI_BASE = import.meta.env.VITE_STRAPI_URL?.replace(/\/$/, '') ?? ''

const props = defineProps({
  card: {
    type: Object,
    required: true
  },
  showDate: {
    type: Boolean,
    default: false
  },
  showDescription: {
    type: Boolean,
    default: false
  },
  linkPrefix: {
    type: String,
    default: undefined
  },
  style: {
    type: Object,
    default: () => ({})
  }
})

const router = useRouter()

const imageUrl = computed(() => {
  if (!props.card.image) return ''
  return props.card.image.url.startsWith('http') 
    ? props.card.image.url 
    : `${STRAPI_BASE}${props.card.image.url}`
})

const handleClick = () => {
  if (props.linkPrefix && props.card.link?.documentId) {
    router.push(`${props.linkPrefix}${props.card.link.documentId}`)
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const getNodeText = (node) => {
  return node.children?.map(c => c.text).join('') || ''
}
</script> 