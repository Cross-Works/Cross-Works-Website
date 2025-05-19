<template>
  <section :style="sectionStyle">
    <h2 :style="titleStyle">{{ title }}</h2>
    <div :style="gridStyle">
      <CardItem
        v-for="card in cards"
        :key="card.id"
        :card="card"
        :show-date="showDate"
        :show-description="showDescription"
        :link-prefix="linkPrefix"
        :style="itemStyle"
      />
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'
import CardItem from './CardItem.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  cards: {
    type: Array,
    required: true
  },
  linkPrefix: {
    type: String,
    default: undefined
  },
  showDate: {
    type: Boolean,
    default: false
  },
  showDescription: {
    type: Boolean,
    default: false
  }
})

// Define styles as reactive objects
const sectionStyle = {
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '20px'
}

const titleStyle = {
  fontSize: '24px',
  marginBottom: '16px'
}

const gridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px'
}

const itemStyle = {
  flex: '0 0 calc(33.333% - 16px)',
  boxSizing: 'border-box'
}
</script> 