import { currentTheme, setAppTheme } from '../store/themeState'

/**
 * Composable for accessing and changing themes
 * This can be used in any component, including views, to control the app theme
 * @returns {Object} Theme utilities
 */
export default function useTheme() {
  /**
   * Set the current theme
   * @param {string} themeName - Theme name without the 'theme-' prefix (e.g., 'xw-white')
   */
  function setTheme(themeName) {
    setAppTheme(themeName)
  }
  
  return {
    currentTheme,
    setTheme
  }
} 