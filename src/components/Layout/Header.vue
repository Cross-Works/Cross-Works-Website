<template>
    <header class="site-header">
        <router-link to="/" class="logo">Logo</router-link>
        <Navigation />
    </header>
</template>

<script>
import Navigation from '../Navigation.vue';




export default {
    components: {
        Navigation
    }
}
</script>

<style lang="scss" scoped>

@use '../../assets/scss/variables' as *;

// Header
.site-header {
  padding: $spacing-lg 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
}

</style>