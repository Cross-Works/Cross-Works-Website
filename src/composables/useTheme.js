import { useThemeStore } from '../stores/theme'

/**
 * Composable for accessing and changing themes
 * This can be used in any component, including views, to control the app theme
 * @returns {Object} Theme utilities
 */
export default function useTheme() {
  const themeStore = useThemeStore()
  
  /**
   * Set the current theme
   * @param {string} themeName - Theme name without the 'theme-' prefix (e.g., 'xw-white')
   */
  function setTheme(themeName) {
    themeStore.setAppTheme(themeName)
  }
  
  return {
    currentTheme: themeStore.currentTheme,
    setTheme
  }
} 