import { ref } from 'vue'

// Shared reactive state for theme across components
const currentTheme = ref('theme-xw-white')

/**
 * Set the application theme
 * @param {string} themeName - Theme name (xw-white, xw-teal, xw-grey, xw-yellow)
 */
function setAppTheme(themeName) {
  // Ensure theme name is prefixed correctly
  const normalizedTheme = themeName.startsWith('theme-') 
    ? themeName 
    : `theme-${themeName}`
    
  //console.log(`Setting application theme to: ${normalizedTheme}`)
  currentTheme.value = normalizedTheme
}

export { currentTheme, setAppTheme } 