<template>
  <div class="homepage">
  
      <div class="main-content">
    
        <!-- Hero section -->
        <section class="hero">
          <div class="logo">
            <h1>XW</h1>
            <p class="tagline">CROSS WORKS</p>
          </div>
          
          <div class="hero-content">
            <h2>Award-winning</h2>
            <div class="expertise">
              <span class="design">design</span>
              <span>&</span>
              <span class="technology">technology</span>
            </div>
            <p>firm, specialising in cities</p>
            <a href="#about-us" class="btn-primary">About us</a>
          </div>
        </section>

        <!-- Featured image section -->
        <section class="featured-image" v-if="strapiStore.featuredMedia">
          <img 
            v-if="strapiStore.featuredMedia.url" 
            :src="strapiStore.featuredMedia.url" 
            :alt="strapiStore.featuredMedia.alt"
            class="featured-img"
          />
          <div v-else class="placeholder-img">Featured Image</div>
        </section>
        <section class="featured-image" v-else>
          <div class="placeholder-img">Featured Image</div>
        </section>

        <!-- What we do section - Dynamic from Strapi -->
        <section class="what-we-do">
          <div v-if="strapiStore.loading.homepage" class="loading">Loading content...</div>
          <div v-else-if="strapiStore.errors.homepage" class="error">Error loading content</div>
          <div v-else>
            <h2>{{ strapiStore.homepageCardsTitle }}</h2>
            <div v-if="strapiStore.homepageCards && strapiStore.homepageCards.length" class="services-grid">
              <div v-for="card in strapiStore.homepageCards" :key="card.id" class="service-card">
                <div class="card-image">
                  <img 
                    v-if="card.thumbnail" 
                    :src="card.thumbnail" 
                    :alt="card.heading"
                    class="thumbnail"
                  />
                  <div v-else class="placeholder-img">
                    <p>{{ card.heading }}</p>
                  </div>
                </div>
                <div class="card-content">
                  <h3>{{ card.heading }}</h3>
                  <p v-if="card.description" class="description">{{ card.description }}</p>
                  <router-link 
                    v-if="card.link.url && card.link.text" 
                    :to="card.link.url" 
                    class="card-link"
                  >
                    {{ card.link.text }}
                  </router-link>
                </div>
              </div>
            </div>
            <!-- Fallback to static content if no cards from Strapi -->
            <div v-else class="services-grid">
              <div class="service-card">
                <div class="placeholder-img">
                  <p>Masterplanning</p>
                </div>
                <h3>Masterplanning & Urban Design</h3>
              </div>
              <div class="service-card">
                <div class="placeholder-img">
                  <p>Software Engineering</p>
                </div>
                <h3>Software Engineering</h3>
              </div>
              <div class="service-card">
                <div class="placeholder-img">
                  <p>Andijan Masterplan</p>
                </div>
                <h3>Andijan Masterplan</h3>
              </div>
              <div class="service-card">
                <div class="placeholder-img">
                  <p>Digital Twin</p>
                </div>
                <h3>Digital Twin</h3>
              </div>
            </div>
          </div>
        </section>

        <!-- About us section -->
        <section id="about-us" class="about-us">
          <h2>About us</h2>
          <p>We've worked in 28 countries, delivering 34 projects that push the boundaries of architecture, design and technology.</p>
          
          <p class="we-are">We are:</p>
          
          <div class="expertise-grid">
            <div class="expertise-item">Architects</div>
            <div class="expertise-item">Urban designers</div>
            <div class="expertise-item">Masterplanners</div>
            <div class="expertise-item">Software Engineers</div>
            <div class="expertise-item">Creative Technologists</div>
            <div class="expertise-item">Web designers</div>
          </div>
        </section>

        <!-- Contact section -->
        <section class="contact">
          <p>Reach out and let's shape what comes next.</p>
          <a href="#contact" class="btn-primary">Contact us</a>
        </section>

       
      </div>
 
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import useTheme from '../composables/useTheme'
import { useStrapiStore } from '../stores/strapi'

const { setTheme } = useTheme()

// Get the Strapi store
const strapiStore = useStrapiStore()

// Lifecycle hooks for event handling
onMounted(async () => {
  setTheme('xw-white')
  
  // Initialize homepage data if needed
  if (!strapiStore.homepageData) {
    await strapiStore.fetchHomepageData()
  }
})

onBeforeUnmount(() => {
 
})
</script>

<style lang="scss" scoped>
@use '../assets/scss/variables' as *;
@use '../assets/scss/typography' as *;
@use '../assets/scss/templates' as *;

.homepage {
  @extend %template-page;
}


.main-content{
  @extend %template-container;
}


// Placeholder for images
.placeholder-img {
  background-color: #eaeaea;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 8px;
  height: 240px;
  color: $xw-teal-dark;
  padding: $spacing-md;
  
  &:hover {
    background-color: #d5d5d5;
  }
}




// Hero section
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: $spacing-xxl 0;
  
  .logo {
    margin-bottom: $spacing-xxl;
    
    h1 {
      color: $xw-teal-medium;
      margin: 0;
      line-height: 1;

      @extend %h1-large;
    }
    
    .tagline {
      color: $xw-teal-light;
      letter-spacing: 2px;

      @extend %p;
    }
  }
  
  .hero-content {
    max-width: 600px;
    
    h2 {
   
      margin-bottom: $spacing-sm;
      color: $xw-black;
      @extend %h2;
    }
    
    .expertise {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: $spacing-sm;
      margin-bottom: $spacing-sm;
      font-size: 32px;
      
      .design {
        color: $xw-teal-medium;
        cursor: pointer;
        transition: color 0.2s;
        
        &:hover {
          color: $xw-teal-dark;
        }
      }
      
      .technology {
        color: $xw-yellow;
        cursor: pointer;
        transition: color 0.2s;
        
        &:hover {
          color: darken($xw-yellow, 10%);
        }
      }
    }
    
    p {
      font-size: 20px;
      margin-bottom: $spacing-lg;
      color: $xw-black;
      @extend %p;
    }
    
    .btn-primary {
      display: inline-block;
      background-color: $xw-teal-medium;
      color: $xw-white;
      padding: $spacing-sm $spacing-lg;
      border-radius: 30px;
      text-decoration: none;
      transition: background-color 0.2s;
      
      &:hover {
        background-color: $xw-teal-dark;
      }
    }
  }
}

// Featured image
.featured-image {
  margin: $spacing-xxl 0;
  
  .placeholder-img {
    width: 100%;
    height: 400px;
  }
  
  .featured-img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 8px;
  }
}

// Loading and error states
.loading, .error {
  text-align: center;
  padding: $spacing-xl;
  font-size: 18px;
  color: $xw-teal-medium;
}

.error {
  color: #e74c3c;
}

// What we do section
.what-we-do {
  padding: $spacing-xxl 0;
  
  h2 {
    text-align: center;
    margin-bottom: $spacing-xxl;
    color: $xw-black;

    @extend %h2;
  }
  
  .services-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-xl;
    
    .service-card {
      overflow: hidden;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s, box-shadow 0.3s;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      }
      
      .card-image {
        position: relative;
        height: 240px;
        
        .thumbnail {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      
      .card-content {
        padding: $spacing-lg;
        
        h3 {
          margin: 0 0 $spacing-sm 0;
          font-size: 18px;
          color: $xw-black;
          @extend %h3;
        }
        
        .description {
          margin: $spacing-sm 0;
          font-size: 14px;
          color: $xw-black;
          opacity: 0.8;
          line-height: 1.4;
        }
        
        .card-link {
          display: inline-block;
          margin-top: $spacing-sm;
          color: $xw-teal-medium;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
          
          &:hover {
            color: $xw-teal-dark;
          }
        }
      }
      
      // Legacy support for old structure
      h3 {
        padding: $spacing-lg;
        margin: 0;
        font-size: 18px;
        color: $xw-black;
        @extend %h3;
      }
    }
  }
}

// About us section
.about-us {
  padding: $spacing-xxl 0;
  text-align: center;
  
  h2 {
    font-size: 36px;
    margin-bottom: $spacing-lg;
    color: $xw-black;
    @extend %h2;
  }
  
  p {
    max-width: 800px;
    margin: 0 auto $spacing-xl;
    font-size: 18px;
    line-height: 1.6;
    color: $xw-black;
    @extend %p;
  }
  
  .we-are {
    font-weight: bold;
    margin-bottom: $spacing-md;
  }
  
  .expertise-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-lg;
    max-width: 800px;
    margin: 0 auto;
    
    .expertise-item {
      padding: $spacing-md;
      font-size: 18px;
      font-weight: 500;
      color: $xw-teal-dark;
      
      &:nth-child(odd) {
        color: $xw-teal-medium;
      }
      
      &:nth-child(3n) {
        color: $xw-yellow;
      }
    }
  }
}

// Contact section
.contact {
  padding: $spacing-xxl 0;
  text-align: center;
  
  p {
    font-size: 24px;
    margin-bottom: $spacing-lg;
    color: $xw-black;
    
  }
  
  .btn-primary {
    display: inline-block;
    background-color: $xw-teal-medium;
    color: $xw-white;
    padding: $spacing-sm $spacing-lg;
    border-radius: 30px;
    text-decoration: none;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: $xw-teal-dark;
    }
  }
}



// Panel open state for body
:global(body.panel-open) {
  overflow: hidden;
}

// Media queries for responsive design
@media (max-width: $breakpoint-lg) {
  .hero .logo h1 {
    font-size: 60px;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .expertise-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .panel-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
 
}

@media (max-width: $breakpoint-md) {
  .hero-content {
    .expertise {
      font-size: 26px;
    }
    
   
  }
  
  .side-panel .panel-tab {
    padding: 15px 5px;
    font-size: 16px;
  }
  
  .panel-grid {
    grid-template-columns: 1fr;
    gap: $spacing-lg;
  }
  
  
}

@media (max-width: $breakpoint-sm) {
  .hero .logo h1 {
    font-size: 48px;
  }
  
  .hero-content {
    .expertise {
      font-size: 22px;
    }
    
    p {
      font-size: 18px;
    }
  }
  
  .expertise-grid {
    grid-template-columns: 1fr;
  }
  

}


</style> 