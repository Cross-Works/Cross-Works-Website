<template>
  <div class="homepage">
    <!-- Backdrop overlay only visible when panels are open -->
    <div class="backdrop" :class="{ 'active': activePanelSide !== null }" @click="closePanels"></div>
    


    <!-- Main content -->
    <div class="page-wrapper">
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
              <span class="design" @click="openPanel('left')">design</span>
              <span>&</span>
              <span class="technology" @click="openPanel('right')">technology</span>
            </div>
            <p>firm, specialising in cities</p>
            <a href="#about-us" class="btn-primary">About us</a>
          </div>
        </section>

        <!-- Featured image section -->
        <section class="featured-image">
          <div class="placeholder-img"></div>
        </section>

        <!-- What we do section -->
        <section class="what-we-do">
          <h2>What we do</h2>
          <div class="services-grid">
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
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// State for side panels
const activePanelSide = ref(null)

// Add event listener for escape key
const handleEscKey = (event) => {
  if (event.key === 'Escape') {
    closePanels()
  }
}

// Panel control functions
function openPanel(side) {
  console.log(`Opening ${side} panel`)
  activePanelSide.value = side
  document.body.classList.add('panel-open')
}

function closePanels() {
  console.log('Closing panels')
  activePanelSide.value = null
  document.body.classList.remove('panel-open')
}

// Lifecycle hooks for event handling
onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
  
  // Test console log
  console.log('HomePage component mounted')
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscKey)
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.homepage {
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
  width: 100%;
}

// Page wrapper for push effect
.page-wrapper {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  
  &.push-right {
    transform: translateX(5%);
  }
  
  &.push-left {
    transform: translateX(-5%);
  }
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

// Main content with proper padding
.main-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 calc(5vw + $spacing-lg);
  /* Use max() to ensure minimum padding */
  padding-left: max(calc(5vw + $spacing-lg), 90px);
  padding-right: max(calc(5vw + $spacing-lg), 90px);
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
      font-size: 80px;
      font-weight: 300;
      color: $xw-teal-medium;
      margin: 0;
      line-height: 1;
    }
    
    .tagline {
      color: $xw-teal-light;
      font-size: 18px;
      letter-spacing: 2px;
    }
  }
  
  .hero-content {
    max-width: 600px;
    
    h2 {
      font-size: 32px;
      font-weight: normal;
      margin-bottom: $spacing-sm;
      color: $xw-black;
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
}

// Featured image
.featured-image {
  margin: $spacing-xxl 0;
  
  .placeholder-img {
    width: 100%;
    height: 400px;
  }
}

// What we do section
.what-we-do {
  padding: $spacing-xxl 0;
  
  h2 {
    text-align: center;
    font-size: 36px;
    margin-bottom: $spacing-xxl;
    color: $xw-black;
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
      
      h3 {
        padding: $spacing-lg;
        margin: 0;
        font-size: 18px;
        color: $xw-black;
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
  }
  
  p {
    max-width: 800px;
    margin: 0 auto $spacing-xl;
    font-size: 18px;
    line-height: 1.6;
    color: $xw-black;
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
    
    p {
      font-size: 20px;
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