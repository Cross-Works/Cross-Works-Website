<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import PanelCities from './components/Layout/PanelCities.vue'
import PanelTech from './components/Layout/PanelTech.vue'
import { currentTheme } from './store/themeState'
import NavigationMobile from './components/NavigationMobile.vue'
import Header from './components/Layout/Header.vue'
import Footer from './components/Layout/Footer.vue'

/**
 * Shared constants
 */
const TAB_WIDTH = 80

/**
 * Reactive state
 */
const activePanelSide = ref<null | 'left' | 'right'>(null)
const dragSide = ref<null | 'left' | 'right'>(null)
const isDragging = computed(() => dragSide.value !== null)
const startX = ref(0)
const menuOpen = ref(false)
const isMobile = ref(false)
const mouseX = ref<number | null>(null)
const windowWidth = ref(window.innerWidth)

/**
 * Helpers
 */
const getClientX = (e: MouseEvent | TouchEvent) =>
  'clientX' in e ? e.clientX : e.touches?.[0].clientX ?? 0

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
  windowWidth.value = window.innerWidth
}

const throttleRAF = (fn: (...args: any[]) => void) => {
  let id = 0
  return (...args: any[]) => {
    if (id) cancelAnimationFrame(id)
    id = requestAnimationFrame(() => fn(...args))
  }
}

/**
 * Computed preview triggers
 */
const showLeftPreview = () =>
  !isDragging.value &&
  !activePanelSide.value &&
  !isMobile.value &&
  mouseX.value !== null &&
  mouseX.value < windowWidth.value * 0.2

const showRightPreview = () =>
  !isDragging.value &&
  !activePanelSide.value &&
  !isMobile.value &&
  mouseX.value !== null &&
  mouseX.value > windowWidth.value * 0.8

/**
 * Core actions
 */
const openPanel = (side: 'left' | 'right') => {
  activePanelSide.value = side
  menuOpen.value = false
  document.body.classList.add('panel-open')
}

const closePanels = () => {
  activePanelSide.value = null
  document.body.classList.remove('panel-open')
}

const toggleMenu = () => {
  if (!activePanelSide.value) menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

/**
 * Pointer‑drag lifecycle
 */
const handlePointerStart = (e: PointerEvent | MouseEvent | TouchEvent, side: 'left' | 'right') => {
  if (menuOpen.value) closeMenu()
  if (activePanelSide.value && activePanelSide.value !== side) return
  dragSide.value = side
  startX.value = getClientX(e)
  const panel = document.querySelector<HTMLElement>(`.side-panel.${side}`)
  panel?.classList.add('dragging')
  panel && (panel.dataset.initialState = activePanelSide.value === side ? 'open' : 'closed')

  const move = (ev: any) => handlePointerMove(ev)
  const end = (ev: any) => handlePointerEnd(ev, move, end)

  document.addEventListener(pointerMoveEvent, move)
  document.addEventListener(pointerEndEvent, end)
  document.addEventListener(pointerCancelEvent, end)

  e.preventDefault?.()
}

const handlePointerMove = (e: PointerEvent | MouseEvent | TouchEvent) => {
  if (!dragSide.value) return
  const panel = document.querySelector<HTMLElement>(`.side-panel.${dragSide.value}`)
  if (!panel) return

  const isInitiallyOpen = panel.dataset.initialState === 'open'
  const currentX = getClientX(e)
  const deltaX = currentX - startX.value
  const percent = (deltaX / panel.offsetWidth) * 100
  let pos = 0

  if (dragSide.value === 'left') {
    pos = isInitiallyOpen ? Math.min(0, Math.max(-100, percent)) : Math.min(0, Math.max(-100, -100 + percent))
    pos > -20 ? document.body.classList.add('panel-near-open') : document.body.classList.remove('panel-near-open')
  } else {
    pos = isInitiallyOpen ? Math.max(0, Math.min(100, percent)) : Math.max(0, Math.min(100, 100 + percent))
    pos < 20 ? document.body.classList.add('panel-near-open') : document.body.classList.remove('panel-near-open')
  }

  panel.style.transform = `translateX(${pos}%)`
  e.preventDefault?.()
}

const handlePointerEnd = (
  _e: PointerEvent | MouseEvent | TouchEvent,
  move: EventListenerOrEventListenerObject,
  end: EventListenerOrEventListenerObject
) => {
  if (!dragSide.value) return
  const panel = document.querySelector<HTMLElement>(`.side-panel.${dragSide.value}`)
  if (!panel) {
    dragSide.value = null
    return
  }

  panel.classList.remove('dragging')
  const match = panel.style.transform.match(/translateX\(([-\d.]+)%\)/)
  const pos = match ? parseFloat(match[1]) : 0
  const initiallyOpen = panel.dataset.initialState === 'open'
  panel.style.transform = ''

  if (dragSide.value === 'left') {
    initiallyOpen ? (pos < -50 ? closePanels() : openPanel('left')) : (pos > -50 ? openPanel('left') : closePanels())
  } else {
    initiallyOpen ? (pos > 50 ? closePanels() : openPanel('right')) : (pos < 50 ? openPanel('right') : closePanels())
  }

  delete panel.dataset.initialState
  document.removeEventListener(pointerMoveEvent, move)
  document.removeEventListener(pointerEndEvent, end)
  document.removeEventListener(pointerCancelEvent, end)
  document.body.classList.remove('panel-near-open')
  dragSide.value = null
}

/**
 * Event wiring
 */
const handleMouseMove = throttleRAF((e: MouseEvent) => {
  if (!isDragging.value) mouseX.value = e.clientX
})

const handleMouseLeave = () => (mouseX.value = null)
const handleEscKey = (e: KeyboardEvent) => e.key === 'Escape' && (menuOpen.value ? closeMenu() : closePanels())
const handleResize = () => {
  checkMobile()
  if (isMobile.value && activePanelSide.value) closePanels()
}

/**
 * Pointer event names for fallback
 */
const hasPointer = 'PointerEvent' in window
const pointerMoveEvent = hasPointer ? 'pointermove' : 'touchmove'
const pointerEndEvent = hasPointer ? 'pointerup' : 'touchend'
const pointerCancelEvent = hasPointer ? 'pointercancel' : 'touchcancel'

/**
 * Lifecycle hooks
 */
onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseleave', handleMouseLeave)
  window.addEventListener('resize', handleResize, { passive: true })
  checkMobile()
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscKey)
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseleave', handleMouseLeave)
  window.removeEventListener('resize', handleResize)
})

const handleMobilePanel = (side: 'left' | 'right') => {
  if (menuOpen.value) closeMenu()
  activePanelSide.value === side ? closePanels() : openPanel(side)
}
</script>

<template>
  <div class="app-container" :class="currentTheme">
    <div class="backdrop" :class="{ active: !!activePanelSide || menuOpen }" @click="menuOpen ? closeMenu() : closePanels()" />

    <div
      class="side-panel left"
      :class="{ active: activePanelSide === 'left', dragging: dragSide === 'left', preview: showLeftPreview() }"
    >
      <div class="panel-tab" @pointerdown="e => handlePointerStart(e, 'left')"><span>Cities</span></div>
      <div class="panel-content"><button class="close-btn" @click="closePanels">×</button><PanelCities /></div>
    </div>

    <div
      class="side-panel right"
      :class="{ active: activePanelSide === 'right', dragging: dragSide === 'right', preview: showRightPreview() }"
    >
      <div class="panel-tab" @pointerdown="e => handlePointerStart(e, 'right')"><span>Technology</span></div>
      <div class="panel-content"><button class="close-btn" @click="closePanels">×</button><PanelTech /></div>
    </div>

    <NavigationMobile
      :menuOpen="menuOpen"
      :activePanelSide="activePanelSide"
      @toggleMenu="toggleMenu"
      @togglePanel="handleMobilePanel"
      @closePanels="closePanels"
    />

    <div class="page-wrapper">
      <Header />
      <main class="page-content">
        <router-view v-slot="{ Component }">
          <Suspense>
            <component :is="Component" />
            <template #fallback><div class="loading">Loading...</div></template>
          </Suspense>
        </router-view>
      </main>
      <Footer />
    </div>
  </div>
</template>

<style lang="scss">
@import './assets/scss/variables';
@import './assets/scss/_themes.scss';
@import './assets/scss/_container.scss';

.app-container {
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
  width: 100%;
  background-color: var(--theme-bg);
  color: var(--theme-text);
  transition: background-color 0.3s, color 0.3s;
}

.page-wrapper {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
}


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


.side-panel {
  position: fixed;
  top: 0;
  height: 100vh;
  
  width: calc(100% - 160px);
  background-color: var(--theme-bg);
  z-index: 100;
  box-shadow: 0 0 25px var(--theme-shadow);
  will-change: transform;
  
  &.dragging {
    transition: none !important;
    z-index: 102;
    
    .panel-tab {
      cursor: grabbing;
    }
  }
  
  &.left {
    left: 0;
    transform: translateX(-100%);
    border-right: 8px solid var(--theme-panel-left);
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);

   background-color: $xw-teal-medium;
    
    &.preview:not(.active):not(.dragging) {
      transform: translateX(-90%);
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
      pointer-events: auto; 
      z-index: 101;
      
      span {
        transform: rotate(180deg);
        user-select: none;
      }
    }
    
    &.active {
      transform: translateX(0);
    }
    
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
      transform: translateX(90%); 
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    background-color: $xw-yellow;
    
    .panel-tab {
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      writing-mode: vertical-lr;
      padding: 30px 12px;
   
      color: var(--theme-text);
      font-weight: 600;
      letter-spacing: 1px;
      cursor: grab;
      touch-action: none;
      pointer-events: auto; 
      z-index: 101; 
      background-color: $xw-yellow;
      
      span {
        user-select: none;
      }
    }
    
    &.active {
      transform: translateX(0);
    }
    

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
    position: relative;
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

.side-panel.active .panel-tab {
  cursor: grab;

}

@keyframes pulseLeft {
  0%, 100% { transform: translate(-50%, -50%); }
  50% { transform: translate(-65%, -50%); }
}

@keyframes pulseRight {
  0%, 100% { transform: translate(-50%, -50%); }
  50% { transform: translate(-35%, -50%); }
}

:global(body.panel-near-open) .side-panel {
  &.left.dragging .panel-tab {
    box-shadow: 0 0 20px var(--theme-panel-left);
  }
  
  &.right.dragging .panel-tab {
    box-shadow: 0 0 20px var(--theme-panel-right);
  }
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  font-size: 1.5rem;
  color: var(--theme-accent);
}

:global(body.panel-open) {
  overflow: hidden;
}

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

// Mobile breakpoint
@media (max-width: $breakpoint-sm) {
  .mobile-menu-button {
    display: flex;
  }
  
  .mobile-home-button {
    display: flex;
  }
  
  .mobile-nav-bar {
    position: fixed;
    bottom: $spacing-lg;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 95;
    padding: 0 $spacing-md;
  }
  
  .side-panel {
    width: 100%;
    
    &.left {
      .panel-tab {
        position: fixed;
        bottom: $spacing-lg;
        left: $spacing-md;
        top: auto;
        transform: none;
        height: 50px;
        width: 120px;
        max-width: 120px;
        writing-mode: horizontal-tb;
        border-radius: 25px;
        background-color: var(--theme-panel-left);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        
        span {
          transform: none;
        }
      }
      
      &.active {
        .panel-tab {
          opacity: 0.7;
        }
      }
    }
    
    &.right {
      .panel-tab {
        position: fixed;
        bottom: $spacing-lg;
        right: $spacing-md;
        top: auto;
        transform: none;
        height: 50px;
        width: 120px;
        max-width: 120px;
        writing-mode: horizontal-tb;
        border-radius: 25px;
        background-color: var(--theme-panel-right);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        
        span {
          transform: none;
        }
      }
      
      &.active {
        .panel-tab {
          opacity: 0.7;
        }
      }
    }
    
    // Mobile panel previews are disabled
    &.preview:not(.active):not(.dragging) {
      transform: translateX(-100%); 
    }
    
    &.right.preview:not(.active):not(.dragging) {
      transform: translateX(100%); 
    }
  }
  

  .expertise-grid {
    grid-template-columns: 1fr;
  }
  
  .side-panel .panel-content {
    padding: $spacing-md;
  }
  
  .drag-indicator {
    display: none;
  }
  

  .mobile-menu-button {
    display: flex;
  }

  body.panel-open .mobile-menu-button {
    display: none;
  }
}
</style>

