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
const isDragging = ref(false)
const startX = ref(0)
const PANEL_WIDTH = 80 // Width in pixels of visible panel when closed

// Mouse position tracking for panel hover effect
const mouseX = ref(null)
const windowWidth = ref(window.innerWidth)

// Track window width for calculations
const handleResize = () => {
  windowWidth.value = window.innerWidth
}

// Left panel should preview if mouse is in left 20%
const showLeftPreview = () => {
  if (isDragging.value || activePanelSide.value !== null) return false
  return mouseX.value !== null && mouseX.value < windowWidth.value * 0.2
}

// Right panel should preview if mouse is in right 20%
const showRightPreview = () => {
  if (isDragging.value || activePanelSide.value !== null) return false
  return mouseX.value !== null && mouseX.value > windowWidth.value * 0.8
}

// Mouse move handler for the entire viewport
const handleMouseMove = (e) => {
  if (!isDragging.value) {
    mouseX.value = e.clientX
  }
}

// Mouse leave handler for the viewport
const handleMouseLeave = () => {
  mouseX.value = null
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

// Add event listener for escape key
const handleEscKey = (event) => {
  if (event.key === 'Escape') {
    closePanels()
  }
}

// Pointer start handler - works for both mouse and touch
const handlePointerStart = (e, side) => {
  // Allow dragging even when panel is open (to close it)
  // We'll track the initial state to know if we're opening or closing
  const isOpening = activePanelSide.value === null
  const isDragToClose = activePanelSide.value === side
  
  // Only allow dragging the active panel or when no panel is active
  if (activePanelSide.value !== null && activePanelSide.value !== side) return
  
  isDragging.value = side
  
  // Safely access clientX for both mouse and touch events
  startX.value = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0)
  
  // Add dragging class immediately to disable transitions
  const panel = document.querySelector(`.side-panel.${side}`)
  if (panel) {
    panel.classList.add('dragging')
    
    // Store initial position on the panel element
    panel.dataset.initialState = isDragToClose ? 'open' : 'closed'
  }
  
  // Use the appropriate event listeners based on device capability
  if (window.PointerEvent) {
    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerEnd)
    document.addEventListener('pointercancel', handlePointerEnd)
  } else {
    // Fallback for browsers that don't support pointer events
    document.addEventListener('mousemove', handlePointerMove)
    document.addEventListener('touchmove', handlePointerMove)
    document.addEventListener('mouseup', handlePointerEnd)
    document.addEventListener('touchend', handlePointerEnd)
    document.addEventListener('touchcancel', handlePointerEnd)
  }
  
  // Prevent default to stop text selection
  if (e.preventDefault) {
    e.preventDefault()
  }
}

// Pointer move handler
const handlePointerMove = (e) => {
  if (!isDragging.value) return
  
  // Safely access clientX for both mouse and touch events
  const currentX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0)
  const deltaX = currentX - startX.value
  
  const panel = document.querySelector(`.side-panel.${isDragging.value}`)
  if (!panel) return
  
  const isInitiallyOpen = panel.dataset.initialState === 'open'
  const panelWidth = panel.offsetWidth
  let percentMoved = (deltaX / panelWidth) * 100
  let newPosition = 0
  
  if (isDragging.value === 'left') {
    if (isInitiallyOpen) {
      // If panel was initially open, negative deltaX means dragging left to close
      // Starting from 0%, going to -100%
      newPosition = Math.min(0, Math.max(-100, percentMoved))
    } else {
      // If panel was initially closed, positive deltaX means dragging right to open
      // Starting from -100%, going to 0%
      newPosition = Math.min(0, Math.max(-100, -100 + percentMoved))
    }
    
    // Visual feedback
    if (newPosition > -20) {
      document.body.classList.add('panel-near-open')
    } else {
      document.body.classList.remove('panel-near-open')
    }
  } else {
    if (isInitiallyOpen) {
      // If panel was initially open, positive deltaX means dragging right to close
      // Starting from 0%, going to 100%
      newPosition = Math.max(0, Math.min(100, percentMoved))
    } else {
      // If panel was initially closed, negative deltaX means dragging left to open
      // Starting from 100%, going to 0%
      newPosition = Math.max(0, Math.min(100, 100 + percentMoved))
    }
    
    // Visual feedback
    if (newPosition < 20) {
      document.body.classList.add('panel-near-open')
    } else {
      document.body.classList.remove('panel-near-open')
    }
  }
  
  panel.style.transform = `translateX(${newPosition}%)`
  
  // Prevent default to stop scrolling
  if (e.preventDefault) {
    e.preventDefault()
  }
}

// Pointer end handler
const handlePointerEnd = (e) => {
  if (!isDragging.value) return
  
  const panel = document.querySelector(`.side-panel.${isDragging.value}`)
  if (!panel) {
    isDragging.value = false
    return
  }
  
  // Remove dragging class
  panel.classList.remove('dragging')
  
  // Get the current transform value
  const transform = panel.style.transform || ''
  const match = transform.match(/translateX\(([-\d.]+)%\)/)
  const isInitiallyOpen = panel.dataset.initialState === 'open'
  
  if (match) {
    const currentPos = parseFloat(match[1])
    
    // Clear the inline style
    panel.style.transform = ''
    
    if (isDragging.value === 'left') {
      if (isInitiallyOpen) {
        // For left panel when initially open: if moved more than 50% left, close it
        if (currentPos < -50) {
          closePanels()
        } else {
          openPanel('left')
        }
      } else {
        // For left panel when initially closed: if moved more than 50% right, open it
        if (currentPos > -50) {
          openPanel('left')
        } else {
          closePanels()
        }
      }
    } else {
      if (isInitiallyOpen) {
        // For right panel when initially open: if moved more than 50% right, close it
        if (currentPos > 50) {
          closePanels()
        } else {
          openPanel('right')
        }
      } else {
        // For right panel when initially closed: if moved more than 50% left, open it
        if (currentPos < 50) {
          openPanel('right')
        } else {
          closePanels()
        }
      }
    }
  } else {
    // Default to closing if we can't determine position
    closePanels()
  }
  
  // Clean up
  delete panel.dataset.initialState
  
  // Clean up event listeners
  if (window.PointerEvent) {
    document.removeEventListener('pointermove', handlePointerMove)
    document.removeEventListener('pointerup', handlePointerEnd)
    document.removeEventListener('pointercancel', handlePointerEnd)
  } else {
    document.removeEventListener('mousemove', handlePointerMove)
    document.removeEventListener('touchmove', handlePointerMove)
    document.removeEventListener('mouseup', handlePointerEnd)
    document.removeEventListener('touchend', handlePointerEnd)
    document.removeEventListener('touchcancel', handlePointerEnd)
  }
  
  document.body.classList.remove('panel-near-open')
  isDragging.value = false
}

// Lifecycle hooks for event handling
onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseleave', handleMouseLeave)
  window.addEventListener('resize', handleResize)
  handleResize()
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscKey)
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseleave', handleMouseLeave)
  window.removeEventListener('resize', handleResize)
  
  // Clean up all possible event listeners
  if (window.PointerEvent) {
    document.removeEventListener('pointermove', handlePointerMove)
    document.removeEventListener('pointerup', handlePointerEnd)
    document.removeEventListener('pointercancel', handlePointerEnd)
  } else {
    document.removeEventListener('mousemove', handlePointerMove)
    document.removeEventListener('touchmove', handlePointerMove)
    document.removeEventListener('mouseup', handlePointerEnd)
    document.removeEventListener('touchend', handlePointerEnd)
    document.removeEventListener('touchcancel', handlePointerEnd)
  }
})
</script>

<template>
  <div class="app-container" :class="currentTheme">
    <div class="backdrop" :class="{ 'active': activePanelSide !== null }" @click="closePanels"></div>
    
    <!-- Left Panel (Cities) -->
    <div 
      class="side-panel left" 
      :class="{ 
        'active': activePanelSide === 'left',
        'dragging': isDragging === 'left',
        'preview': showLeftPreview()
      }"
    >
      <div 
        class="panel-tab" 
        @pointerdown="(e) => handlePointerStart(e, 'left')"
      >
        <span>Cities</span>
        <div v-if="activePanelSide === 'left'" class="drag-indicator left"></div>
      </div>
      
      <div class="panel-content">
        <button class="close-btn" @click="closePanels">&times;</button>
        <PanelCities />
      </div>
    </div>

    <!-- Right Panel (Technology) -->
    <div 
      class="side-panel right" 
      :class="{ 
        'active': activePanelSide === 'right',
        'dragging': isDragging === 'right',
        'preview': showRightPreview()
      }"
    >
      <div 
        class="panel-tab" 
        @pointerdown="(e) => handlePointerStart(e, 'right')"
      >
        <span>Technology</span>
        <div v-if="activePanelSide === 'right'" class="drag-indicator right"></div>
      </div>
      
      <div class="panel-content">
        <button class="close-btn" @click="closePanels">&times;</button>
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
  padding: 0 $spacing-xl;
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

// Side panels - always visible with tab and draggable
.side-panel {
  position: fixed;
  top: 0;
  height: 100vh;
  // Panels take up full width minus space for both tabs on sides
  width: calc(100% - 160px);
  background-color: var(--theme-bg);
  z-index: 100;
  box-shadow: 0 0 25px var(--theme-shadow);
  will-change: transform;
  
  &.dragging {
    transition: none !important;
    z-index: 102; // Ensure dragging panel is above everything
    
    .panel-tab {
      cursor: grabbing;
    }
  }
  
  &.left {
    left: 0;
    transform: translateX(-100%);
    border-right: 8px solid var(--theme-panel-left);
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    
    &.preview:not(.active):not(.dragging) {
      transform: translateX(-90%); // Show 10% of the panel when in preview mode
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .panel-tab {
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      writing-mode: vertical-lr;
      text-orientation: mixed;
      padding: 30px 12px;
      background: var(--theme-panel-left);
      color: var(--theme-secondary);
      font-weight: 600;
      letter-spacing: 1px;
      cursor: grab;
      touch-action: none;
      pointer-events: auto; // Ensure the tab can always be clicked/dragged
      z-index: 101; // Make tabs above panels but below dragging panels
      
      span {
        transform: rotate(180deg);
        user-select: none;
      }
    }
    
    // When open, keep tab clickable
    &.active .panel-tab {
      cursor: grab;
      &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      }
    }
    
    &.active {
      transform: translateX(0);
    }
    
    // When closed, only the tab sticks out
    &:not(.active):not(.dragging):not(.preview) {
      transform: translateX(-100%);
    }
  }
  
  &.right {
    right: 0;
    transform: translateX(100%);
    border-left: 8px solid var(--theme-panel-right);
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    
    &.preview:not(.active):not(.dragging) {
      transform: translateX(90%); // Show 10% of the panel when in preview mode
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .panel-tab {
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      writing-mode: vertical-lr;
      padding: 30px 12px;
      background: var(--theme-panel-right);
      color: var(--theme-text);
      font-weight: 600;
      letter-spacing: 1px;
      cursor: grab;
      touch-action: none;
      pointer-events: auto; // Ensure the tab can always be clicked/dragged
      z-index: 101; // Make tabs above panels but below dragging panels
      
      span {
        user-select: none;
      }
    }
    
    // When open, keep tab clickable
    &.active .panel-tab {
      cursor: grab;
      &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      }
    }
    
    &.active {
      transform: translateX(0);
    }
    
    // When closed, only the tab sticks out
    &:not(.active):not(.dragging):not(.preview) {
      transform: translateX(100%);
    }
  }
  
  .panel-tab {
    width: 80px;
    max-width: 80px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    transition: all 0.3s;
  
    z-index: 101;
    text-transform: uppercase;
    touch-action: none;
  }
  
  .panel-content {
    padding: $spacing-xl;
    margin: 0 auto;
    height: 100%;
    overflow-y: auto;
    cursor: default;
    pointer-events: auto;
    
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

// Visual indicator for panel near open state
:global(body.panel-near-open) .side-panel {
  &.left.dragging .panel-tab {
    box-shadow: 0 0 20px var(--theme-panel-left);
  }
  
  &.right.dragging .panel-tab {
    box-shadow: 0 0 20px var(--theme-panel-right);
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

// Add styles for drag indicator
.panel-tab {
  position: relative; // Ensure the indicator is positioned relative to the tab
  
  .drag-indicator {
    position: absolute;
    width: 24px;
    height: 4px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 2px;
    transition: transform 0.3s ease;
    
    &.left {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: pulseLeft 2s infinite;
    }
    
    &.right {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: pulseRight 2s infinite;
    }
  }
}

@keyframes pulseLeft {
  0%, 100% { transform: translate(-50%, -50%); }
  50% { transform: translate(-65%, -50%); }
}

@keyframes pulseRight {
  0%, 100% { transform: translate(-50%, -50%); }
  50% { transform: translate(-35%, -50%); }
}
</style>
