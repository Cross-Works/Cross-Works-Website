import { ref, computed } from 'vue'
import { useFetch } from './useFetch'

// Mock navigation data for development
const MOCK_NAVIGATION = [
  { Text: "Home", Slug: "home" },
  { Text: "About", Slug: "about" },
  { Text: "News", Slug: "news" },
  { Text: "Contact", Slug: "contact" }
]

/**
 * Composable to fetch and manage navigation links
 * Supports both the internal links structure (Text/Slug) and standard links
 */
export function useNavigation() {
  // Pass fallback data for development environments
  const { data, loading, error } = useFetch('/api/global?populate=deep', {
    fallbackData: {
      data: {
        attributes: {
          Navigation: {
            Link: MOCK_NAVIGATION
          }
        }
      }
    }
  })

  console.log('Fetching navigation data from Strapi:', useFetch('/api/global?populate=*') )
  
  /**
   * Format a slug into a proper URL path
   * @param {string} slug - The slug from Strapi
   * @returns {string} The formatted URL path
   */
  const formatSlugToUrl = (slug) => {
    if (!slug) return '/'
    if (slug === 'home') return '/'
    return `/${slug}`
  }
  
  /**
   * Process links from various formats into a consistent format
   * @param {Array} links - Raw links from Strapi
   * @returns {Array} Processed links with consistent properties
   */
  const processLinks = (links) => {
    if (!links || !Array.isArray(links)) return []
    
    return links.map(link => {
      // Handle Text/Slug format (Internal Link component)
      if (link.Text !== undefined && link.Slug !== undefined) {
        return {
          text: link.Text,
          url: formatSlugToUrl(link.Slug),
          isExternal: false
        }
      }
      
      // Handle standard link format
      return {
        text: link.text || link.Text || link.label || link.title || 'Link',
        url: link.url || (link.Slug ? formatSlugToUrl(link.Slug) : link.href) || '/',
        isExternal: link.isExternal || link.external || false
      }
    })
  }
  
  /**
   * Extract navigation links from various possible paths in the response
   */
  const links = computed(() => {
    // If we're in development and have no data, use the mock data
    if (import.meta.env.DEV && (!data.value || error.value)) {
      console.warn('Using mock navigation data in development mode')
      return processLinks(MOCK_NAVIGATION)
    }
    
    if (!data.value) return []
    
    console.log('Navigation data response:', data.value)
    
    // Try different possible paths for navigation data
    const paths = [
      // Strapi v4 paths
      () => data.value.data.attributes.Navigation.Link,
      () => data.value.data.attributes.Navigation,
      // Direct paths
      () => data.value.data.Navigation,
      () => data.value.Navigation,
      // Other possible paths
      () => data.value.data.attributes.menu?.items,
      () => data.value.data.attributes.navigationLinks
    ]
    
    let navLinks = null
    for (const pathFn of paths) {
      try {
        const result = pathFn()
        if (result) {
          navLinks = Array.isArray(result) ? result : (result.Link || result.links || [])
          console.log('Found navigation at path:', result)
          break
        }
      } catch (e) {
        // Path doesn't exist, continue to next one
      }
    }
    
    if (!navLinks) {
      console.warn('Navigation data not found in response, using fallback')
      return processLinks(MOCK_NAVIGATION)
    }
    
    return processLinks(navLinks)
  })
  
  // Return all the data and utility functions
  return {
    links,
    loading,
    error,
    rawData: data,
    processLinks,
    formatSlugToUrl
  }
} 