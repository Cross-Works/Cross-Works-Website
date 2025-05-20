<template>
    <div class="navigation-mobile" :class="{ 
        'menu-open': menuOpen,
        'panel-open': activePanelSide !== null,
        'left-panel-open': activePanelSide === 'left',
        'right-panel-open': activePanelSide === 'right'
    }">
        <!-- Cities button (left) -->
        <button 
            @click="$emit('togglePanel', 'left')" 
            class="nav-button cities-button"
            :class="{ 
                'active': activePanelSide === 'left',
                'circle': menuOpen || (activePanelSide !== null && activePanelSide !== 'left')
            }"
        >
            <span class="button-text" :class="{ 'hidden': menuOpen || (activePanelSide !== null && activePanelSide !== 'left') }">Cities</span>
        </button>
        
        <!-- Menu/Home button (center) -->
        <button 
            @click="activePanelSide !== null ? $emit('closePanels') : $emit('toggleMenu')" 
            class="nav-button menu-button"
            :class="{ 
                'active': menuOpen,
                'home-active': activePanelSide !== null
            }"
        >
            <div v-if="!menuOpen && activePanelSide === null" class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div v-else-if="menuOpen && activePanelSide === null" class="close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
            <div v-else class="home-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
            </div>
        </button>
        
        <!-- Tech button (right) -->
        <button 
            @click="$emit('togglePanel', 'right')" 
            class="nav-button tech-button"
            :class="{ 
                'active': activePanelSide === 'right',
                'circle': menuOpen || (activePanelSide !== null && activePanelSide !== 'right')
            }"
        >
            <span class="button-text" :class="{ 'hidden': menuOpen || (activePanelSide !== null && activePanelSide !== 'right') }">Tech</span>
        </button>
        
        <!-- Mobile Menu Content -->
        <div class="mobile-menu" :class="{ 'active': menuOpen }">
            <nav>
                <ul>
                    <li><router-link to="/" @click="$emit('toggleMenu')">Home</router-link></li>
                    <li><router-link to="/about" @click="$emit('toggleMenu')">About</router-link></li>
                    <li><router-link to="/news" @click="$emit('toggleMenu')">News</router-link></li>
                    <li><router-link to="/contact" @click="$emit('toggleMenu')">Contact</router-link></li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    menuOpen: {
        type: Boolean,
        default: false
    },
    activePanelSide: {
        type: String,
        default: null
    }
});

defineEmits(['toggleMenu', 'togglePanel', 'closePanels']);
</script>

<style lang="scss" scoped>
@use '../assets/scss/variables' as *;

.navigation-mobile {
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 450px;
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
    border-radius: 28px;
    background-color: white;
    padding: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    
    &.menu-open {
        justify-content: space-around;
    }
    
    &.panel-open {
        justify-content: space-around;
    }
    
    &.left-panel-open {
        .cities-button {
            width: 60%;
            border-radius: 24px;
        }
    }
    
    &.right-panel-open {
        .tech-button {
            width: 60%;
            border-radius: 24px;
        }
    }
}

.nav-button {
    height: 48px;
    border: none;
    border-radius: 24px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    
    &:active {
        transform: scale(0.96);
    }
    
    &.circle {
        width: 48px;
        padding: 0;
        border-radius: 50%;
    }
    
    .button-text {
        transition: opacity 0.2s ease, transform 0.2s ease;
        
        &.hidden {
            opacity: 0;
            transform: scale(0);
        }
    }
}

.cities-button {
    background-color: $xw-teal-medium;
    color: white;
    width: 40%;
    transition: width 0.3s ease, border-radius 0.3s ease;
    
    &.active {
        background-color: darken($xw-teal-medium, 10%);
        width: 60%;
    }
    
    &.circle {
        width: 48px;
        padding: 0;
    }
}

.menu-button {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: $xw-grey-light;
    margin: 0 4px;
    position: relative;
    
    &.active {
        background-color: darken(#E0E0E0, 10%);
    }
    
    &.home-active {
        background-color: $xw-white;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    
    .hamburger {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 18px;
        height: 14px;
        
        span {
            display: block;
            width: 100%;
            height: 2px;
            background-color: #333;
            transition: transform 0.3s, opacity 0.2s;
        }
    }
    
    .close {
        color: #333;
        display: flex;
        align-items: center;
        justify-content: center;
        
        svg {
            width: 20px;
            height: 20px;
            stroke: currentColor;
            stroke-width: 2.5;
        }
    }
    
    .home-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        
        svg {
            width: 22px;
            height: 22px;
            fill: #333;
            stroke: #333;
            stroke-width: 1;
        }
    }
}

.tech-button {
    background-color: $xw-yellow; 
    color: black;
    width: 40%;
    transition: width 0.3s ease, border-radius 0.3s ease;
    
    &.active {
        background-color: $xw-yellow;
        width: 60%;
    }
    
    &.circle {
        width: 48px;
        padding: 0;
    }
}

// Mobile Menu Content
.mobile-menu {
    position: fixed;
    bottom: 76px;
    left: 50%;
    transform: translateX(-50%) scale(0.9);
    width: 80%;
    max-width: 300px;
    background-color: #fff;
    border-radius: 16px;
    padding: $spacing-lg 0;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    z-index: 95;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    
    &.active {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) scale(1);
    }
    
    &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        width: 16px;
        height: 16px;
        background-color: #fff;
        box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
        z-index: -1;
    }
    
    nav {
        width: 100%;
        
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            
            li {
                text-align: center;
                padding: $spacing-sm 0;
                
                a {
                    display: block;
                    font-size: 18px;
                    color: #333;
                    text-decoration: none;
                    padding: $spacing-sm $spacing-lg;
                    transition: all 0.2s;
                    border-radius: 8px;
                    margin: 0 $spacing-md;
                    
                    &:hover {
                        color: var(--theme-accent);
                        background-color: rgba(0, 0, 0, 0.05);
                    }
                    
                    &.router-link-exact-active {
                        font-weight: bold;
                        color: var(--theme-accent);
                        background-color: rgba(0, 0, 0, 0.05);
                    }
                }
            }
        }
    }
}

// Safe area inset support for iOS
@supports (padding: max(0px)) {
    .navigation-mobile {
        padding-bottom: max(4px, env(safe-area-inset-bottom, 4px));
        bottom: max(16px, env(safe-area-inset-bottom, 16px));
    }
}
</style>