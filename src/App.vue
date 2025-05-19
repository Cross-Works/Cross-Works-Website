<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import PanelCities from './components/Layout/PanelCities.vue'
import PanelTech from './components/Layout/PanelTech.vue'
import { currentTheme } from './store/themeState'
import useTheme from './composables/useTheme'
import Navigation from './components/Navigation.vue'
import Header from './components/Layout/Header.vue'
import Footer from './components/Layout/Footer.vue'

// Get theme utilities
const { setTheme } = useTheme()

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

  activePanelSide.value = side
  document.body.classList.add('panel-open')
}

function closePanels() {

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
  <div class="app-container" :class="currentTheme">
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
      </div>
    </div>

    <!-- Main content -->
    <div class="page-wrapper">
      <div class="main-content">
        <!-- Top navigation -->
        <Header/>
        
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
        
        <Footer />

      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './assets/scss/variables';
@import './assets/scss/_themes.scss';

.app-container {
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
  width: 100%;
  background-color: var(--theme-bg);
  color: var(--theme-text);
  transition: background-color 0.3s, color 0.3s;
}

// Page wrapper for push effect
.page-wrapper {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  min-height: 100vh;
  display: flex;
  flex-direction: column;

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
  background-color: rgba(0, 0, 0, 0.5);
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
  background-color: var(--theme-bg);
  z-index: 100;
  box-shadow: 0 0 25px var(--theme-shadow);
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
    background-color: rgba($color: pink, $alpha: .2);
  }
  
  &.left {
    left: 0;
    transform: translateX(-95%);
    border-right: 8px solid var(--theme-panel-left);
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    
    .panel-tab {
      position: absolute;
      right: -2px;
      top: 50%;
      transform: translateY(-50%);
      writing-mode: vertical-lr;
      text-orientation: mixed;
      padding: 30px 12px;
      background: var(--theme-panel-left);
      color: var(--theme-secondary);
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
        box-shadow: 4px 0 12px var(--theme-shadow);
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
    background-color: rgba($color: pink, $alpha: .2);
  }
  
  &.right {
    right: 0;
    transform: translateX(95%);
    border-left: 8px solid var(--theme-panel-right);
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    
    .panel-tab {
      position: absolute;
      left: -2px;
      top: 50%;
      transform: translateY(-50%);
      writing-mode: vertical-lr;
      padding: 30px 12px;
      background: var(--theme-panel-right);
      color: var(--theme-text);
      font-weight: 600;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      letter-spacing: 1px;
    }
    
    &:not(.no-hover):hover {
      transform: translateX(80%);
      
      .panel-tab {
        padding-left: 16px;
        box-shadow: -4px 0 12px var(--theme-shadow);
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
    box-shadow: 0 0 15px var(--theme-shadow);
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
      color: var(--theme-header);
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
      color: var(--theme-text);
      z-index: 101;
      transition: transform 0.2s ease, color 0.2s ease;
      
      &:hover {
        color: var(--theme-accent);
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
      color: var(--theme-header);
      font-size: 20px;
      font-weight: 500;
    }
    
    .panel-links {
      display: flex;
      flex-direction: column;
      gap: $spacing-md;
      
      a {
        color: var(--theme-link);
        font-size: 16px;
        transition: color 0.2s;
        
        &:hover {
          color: var(--theme-link-hover);
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
  color: var(--theme-accent);
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
