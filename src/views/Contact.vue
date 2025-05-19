<template>
  <div>
    Contact
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import useTheme from '../composables/useTheme'

const { setTheme } = useTheme()



onMounted(() => {
  setTheme('xw-teal')
})

</script> 