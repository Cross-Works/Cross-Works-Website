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
      v-if="imageUrl"
      :src="imageUrl"
      :alt="card.image?.data?.attributes?.alternativeText || ''"
      style="width: 100%; height: 160px; object-fit: cover"
    />

    <div style="padding: 12px">
      <p
        v-if="showDate && card.publishedAt"
        style="margin: 0; font-size: 12px; color: #666"
      >
        {{ formatDate(card.publishedAt) }}
      </p>
      <h3 style="margin: 8px 0 0; font-size: 16px">{{ card.title }}</h3>
      <div v-if="showDescription && card.content">
        <template v-if="typeof card.content === 'string'">
          <p style="margin: 8px 0 0; font-size: 14px; color: #444">
            {{ card.content }}
          </p>
        </template>
        <template v-else>
          <div v-for="(node, idx) in card.content" :key="idx">
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

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

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
  const image = props.card.image?.data?.attributes
  if (!image?.url) return ''
  return image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`
})

const handleClick = () => {
  if (props.linkPrefix && props.card.id) {
    router.push(`${props.linkPrefix}${props.card.id}`)
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