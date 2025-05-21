import { ref, computed, provide, readonly, inject } from 'vue'
import { useFetch } from './useFetch'

// Symbol for providing/injecting global data
export const GlobalSymbol = Symbol('global')

/**
 * Fetches and provides global site data from Strapi
 * Including navigation, footer, and site metadata
 */
export function useGlobal() {
  // Fetch global data from Strapi
  const { data, loading, error } = useFetch('/api/global?populate=deep')
  
  // Debug the data structure
  const dataStructure = computed(() => {
    console.log('Global data:', data.value)
    return data.value
  })
  
  // Extract navigation links from the response with more flexible path handling
  const navigation = computed(() => {
    if (!data.value) return []
    
    // Try different possible paths for navigation data
    const paths = [
      // Standard Strapi v4 path with Navigation component
      () => data.value.data.attributes.Navigation.Link,
      // Alternative direct path
      () => data.value.data.attributes.Navigation,
      // Direct path for simpler structure
      () => data.value.data.Navigation,
      // Root level navigation
      () => data.value.Navigation,
      // Root level links
      () => data.value.links || data.value.Links
    ]
    
    let navLinks = null
    for (const pathFn of paths) {
      try {
        const result = pathFn()
        if (result) {
          navLinks = Array.isArray(result) ? result : (result.Link || result.links || [])
          break
        }
      } catch (e) {
        // Path doesn't exist, continue to next one
      }
    }
    
    if (!navLinks) {
      console.log('Navigation data not found. Data structure:', data.value)
      return []
    }
    
    console.log('Found navigation links:', navLinks)
    
    // Map the links to a consistent format
    return navLinks.map(link => {
      // Handle internal links using the Text and Slug format
      if (link.Text && link.Slug !== undefined) {
        return {
          text: link.Text,
          url: `/${link.Slug === 'home' ? '' : link.Slug}`,
          isExternal: false
        }
      }
      
      // Fall back to other formats if needed
      return {
        text: link.text || link.Text || link.label || link.title || 'Link',
        url: link.url || link.Slug ? `/${link.Slug}` : link.href || link.path || '/',
        isExternal: link.isExternal || link.external || false
      }
    })
  })
  
  // Extract site metadata
  const siteInfo = computed(() => {
    if (!data.value?.data?.attributes) return {
      name: 'Cross Works',
      description: ''
    }
    
    const attrs = data.value.data.attributes
    return {
      name: attrs.siteName || 'Cross Works',
      description: attrs.siteDescription || '',
      favicon: attrs.favicon?.data?.attributes?.url || null
    }
  })
  
  // Extract footer data
  const footer = computed(() => {
    if (!data.value?.data?.attributes?.Footer) return null
    return data.value.data.attributes.Footer
  })
  
  // Combined object with all global data
  const global = {
    navigation,
    siteInfo,
    footer,
    loading,
    error,
    dataStructure // Debugging helper
  }
  
  // Provide the global data
  provide(GlobalSymbol, readonly(global))
  
  return global
}

/**
 * Use this composable to inject global data in any component
 */
export function useGlobalData() {
  const global = inject(GlobalSymbol)
  if (!global) {
    console.warn('GlobalSymbol not provided. Make sure useGlobal is called in a parent component')
    return {
      navigation: ref([]),
      siteInfo: ref({ name: 'Cross Works', description: '' }),
      footer: ref(null),
      loading: ref(false),
      error: ref(null)
    }
  }
  return global
} 