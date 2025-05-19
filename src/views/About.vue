<template>
  <div>
    About
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import useTheme from '../composables/useTheme'

const { setTheme } = useTheme()



onMounted(() => {
  setTheme('xw-grey')
})


</script> 