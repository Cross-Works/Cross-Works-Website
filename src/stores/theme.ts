import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // State
  const currentTheme = ref('theme-xw-white')

  // Actions
  const setAppTheme = (themeName: string) => {
    // Ensure theme name is prefixed correctly
    const normalizedTheme = themeName.startsWith('theme-') 
      ? themeName 
      : `theme-${themeName}`
      
    currentTheme.value = normalizedTheme
  }

  return {
    currentTheme,
    setAppTheme
  }
}) 