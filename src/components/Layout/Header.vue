<template>
    <header class="site-header">
    
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