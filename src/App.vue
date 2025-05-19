<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import PanelCities from './components/PanelCities.vue'
import PanelTech from './components/PanelTech.vue'

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
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscKey)
})
</script>

<template>
  <div class="app-container">

    <div class="backdrop" :class="{ 'active': activePanelSide !== null }" @click="closePanels"></div>
    
    <div class="side-panel left" :class="{ 
        'active': activePanelSide === 'left',
        'no-hover': activePanelSide !== null 
      }" 
      @click="activePanelSide === null && openPanel('left')">
      <div class="panel-tab">
        <span>Cities</span>
      </div>
      
      <div class="panel-content" @click.stop>
        <PanelCities />
        <button class="close-btn" @click.stop="closePanels">×</button>
      </div>
    </div>

    <div class="side-panel right" :class="{ 
        'active': activePanelSide === 'right',
        'no-hover': activePanelSide !== null 
      }" 
      @click="activePanelSide === null && openPanel('right')">
      <div class="panel-tab">
        <span>Technology</span>
      </div>
      
      <div class="panel-content" @click.stop>
        <PanelTech />
        <button class="close-btn" @click.stop="closePanels">×</button>
      </div>
    </div>

    <!-- Main content -->
    <div class="page-wrapper" :class="{ 
      'push-right': activePanelSide === 'left',
      'push-left': activePanelSide === 'right'
    }">
      <div class="main-content">
        <!-- Top navigation -->
        <header class="site-header">
          <nav>
            <ul>
              <li><router-link to="/about">About</router-link></li>
              <li><router-link to="/news">News</router-link></li>
              <li><router-link to="/contact">Contact</router-link></li>
            </ul>
          </nav>
        </header>
        
        <!-- Page content (router view) -->
        <main class="page-content">
          <router-view v-slot="{ Component }">
            <Suspense>
              <component :is="Component" />
              <template #fallback>
                <div class="loading">Loading...</div>
              </template>
            </Suspense>
          </router-view>
        </main>
        
        <!-- Footer -->
        <footer>
          <div class="footer-section">
            <h4>Find us</h4>
            <p>1 Bonny Street <br/>
              Camden, London, NW1 9PE</p>
            <p>View on map</p>
          </div>
          <div class="footer-section">
            <h4>Contact us</h4>
            <p>+44 (0) 20 7916 1827</p>
            <p>Mon-Fri 9 am-5:30 pm</p>
            <p>london@cross-works.co.uk</p>
          </div>
          <div class="footer-section">
            <h4>Follow us</h4>
            <div class="social-icons">
              <a href="#" class="social-icon">LinkedIn</a>
              <a href="#" class="social-icon">Twitter</a>
              <a href="#" class="social-icon">Instagram</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './assets/scss/variables';

.app-container {
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
  width: 100%;
}


.page-wrapper {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  
  &.push-right {
    transform: translateX(5%);
  }
  
  &.push-left {
    transform: translateX(-5%);
  }
}

// Main content container
.main-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 calc(5vw + $spacing-lg);
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

// Page content area
.page-content {
  flex: 1;
}

// Backdrop overlay
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  //background-color: rgba(0, 0, 0, 0.5);
  z-index: 90;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  
  &.active {
    opacity: 1;
    visibility: visible;
  }
}

// Side panels - always visible with tab
.side-panel {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 95%;
  background-color: $xw-white;
  z-index: 100;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  
  &.no-hover {
    pointer-events: none;
    
    .panel-content, .panel-tab, .close-btn {
      pointer-events: auto;
    }
    
    &::before {
      display: none;
    }
  }
  
  &.left::before {
    content: '';
    position: absolute;
    top: 0;
    right: -20vw; 
    width: 20vw;
    height: 100%;
    z-index: -1;
    pointer-events: all; 
  }
  
  &.left {
    left: 0;
    transform: translateX(-95%);
    border-right: 8px solid $xw-teal-medium;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    
    .panel-tab {
      position: absolute;
      right: -2px;
      top: 50%;
      transform: translateY(-50%);
      writing-mode: vertical-lr;
      text-orientation: mixed;
      padding: 30px 12px;
      background: linear-gradient(to right, darken($xw-teal-medium, 5%), $xw-teal-medium);
      color: $xw-white;
      font-weight: 600;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      letter-spacing: 1px;
      
      span {
        transform: rotate(180deg);
      }
    }
    
    &:not(.no-hover):hover {
      transform: translateX(-80%);
      
      .panel-tab {
        padding-right: 16px;
        box-shadow: 4px 0 12px rgba(0, 0, 0, 0.2);
      }
    }
    
    &.active {
      transform: translateX(0);
      cursor: default;
    }
  }
  
  &.right::before {
    content: '';
    position: absolute;
    top: 0;
    left: -20vw;
    width: 20vw;
    height: 100%;
    z-index: -1;
    pointer-events: all;
  }
  
  &.right {
    right: 0;
    transform: translateX(95%);
    border-left: 8px solid $xw-yellow;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    
    .panel-tab {
      position: absolute;
      left: -2px;
      top: 50%;
      transform: translateY(-50%);
      writing-mode: vertical-lr;
      padding: 30px 12px;
      background: linear-gradient(to left, darken($xw-yellow, 5%), $xw-yellow);
      color: $xw-black;
      font-weight: 600;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      letter-spacing: 1px;
    }
    
    &:not(.no-hover):hover {
      transform: translateX(80%);
      
      .panel-tab {
        padding-left: 16px;
        box-shadow: -4px 0 12px rgba(0, 0, 0, 0.2);
      }
    }
    
    &.active {
      transform: translateX(0);
      cursor: default;
    }
  }
  
  .panel-tab {
    width: 5vw;
    max-width: 60px;
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    transition: all 0.3s;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
    z-index: 101;
    text-transform: uppercase;
  }
  
  .panel-content {
    padding: $spacing-xl;
    margin: 0 auto;
    height: 100%;
    overflow-y: auto;
    cursor: default;
    
    h2 {
      margin-bottom: $spacing-xl;
      color: $xw-black;
      font-size: 36px;
      font-weight: 300;
    }
    
    .close-btn {
      position: absolute;
      top: $spacing-lg;
      right: $spacing-lg;
      background: none;
      border: none;
      font-size: 32px;
      cursor: pointer;
      color: $xw-black;
      z-index: 101;
      transition: transform 0.2s ease, color 0.2s ease;
      
      &:hover {
        color: $xw-teal-dark;
        transform: scale(1.1);
      }
    }
  }
}

.panel-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-xl;
  
  .panel-section {
    h3 {
      margin-bottom: $spacing-lg;
      color: $xw-black;
      font-size: 20px;
      font-weight: 500;
    }
    
    .panel-links {
      display: flex;
      flex-direction: column;
      gap: $spacing-md;
      
      a {
        color: $xw-teal-dark;
        font-size: 16px;
        transition: color 0.2s;
        
        &:hover {
          color: $xw-teal-light;
        }
      }
    }
  }
}

// Header
.site-header {
  padding: $spacing-lg 0;
  
  nav ul {
    display: flex;
    justify-content: center;
    list-style: none;
    gap: $spacing-xl;
    
    a {
      color: $xw-teal-dark;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
      
      &:hover {
        color: $xw-teal-light;
      }
    }
  }
}

// Footer
footer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-xl;
  padding: $spacing-xxl 0;
  border-top: 1px solid $xw-grey;
  margin-top: auto;
  
  .footer-section {
    h4 {
      color: $xw-teal-dark;
      margin-bottom: $spacing-md;
      font-size: 16px;
    }
    
    p {
      color: $xw-black;
      margin-bottom: $spacing-sm;
      font-size: 14px;
    }
    
    .social-icons {
      display: flex;
      gap: $spacing-md;
      
      .social-icon {
        color: $xw-teal-medium;
        transition: color 0.2s;
        
        &:hover {
          color: $xw-teal-dark;
        }
      }
    }
  }
}

// Loading state
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  font-size: 1.5rem;
  color: $xw-teal-medium;
}

// Panel open state for body
:global(body.panel-open) {
  overflow: hidden;
}

// Media queries for responsive design
@media (max-width: $breakpoint-lg) {
  .panel-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  footer {
    grid-template-columns: 1fr;
    gap: $spacing-xl;
    text-align: center;
    
    .social-icons {
      justify-content: center;
    }
  }
}

@media (max-width: $breakpoint-md) {
  .side-panel .panel-tab {
    padding: 15px 5px;
    font-size: 16px;
  }
  
  .panel-grid {
    grid-template-columns: 1fr;
    gap: $spacing-lg;
  }
  
  .side-panel .panel-content {
    padding: $spacing-lg;
    
    h2 {
      font-size: 28px;
      margin-bottom: $spacing-lg;
    }
  }
}

@media (max-width: $breakpoint-sm) {
  .expertise-grid {
    grid-template-columns: 1fr;
  }
  
  .side-panel .panel-content {
    padding: $spacing-md;
  }
  
  .side-panel .panel-tab {
    padding: 10px 5px;
    font-size: 14px;
    height: 150px;
  }
}
</style>
