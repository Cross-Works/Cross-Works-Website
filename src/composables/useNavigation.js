import { ref, computed } from 'vue'
import { useFetch } from './useFetch'

/**
 * Composable to fetch and manage navigation links
 * Supports both the internal links structure (Text/Slug) and standard links
 */
export function useNavigation() {
  // Fetch navigation data from Strapi using v5 populate syntax
  const { data, loading, error } = useFetch('/api/global?populate[Navigation][populate][Link]=*')
  
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
    if (!data.value) return []
    
    console.log('Raw Strapi v5 response:', data.value)
    
    // Try different possible paths for Strapi v5 navigation data
    const paths = [
      // Strapi v5 paths
      () => data.value.data?.attributes?.Navigation?.Link,
      () => data.value.data?.attributes?.Navigation?.data?.attributes?.Link,
      // Alternative common paths
      () => data.value.data?.attributes?.Navigation,
      () => data.value.data?.Navigation,
      () => data.value.Navigation,
    ]
    
    let navLinks = null
    for (const pathFn of paths) {
      try {
        const result = pathFn()
        if (result) {
          console.log('Found navigation at path:', result)
          
          // Handle both array and object structures
          if (Array.isArray(result)) {
            navLinks = result
          } else if (typeof result === 'object') {
            navLinks = result.Link || result.links || []
          }
          
          if (navLinks && navLinks.length) {
            break
          }
        }
      } catch (e) {
        // Path doesn't exist, continue to next one
      }
    }
    
    if (!navLinks || !navLinks.length) {
      console.error('Navigation data not found in response structure', data.value)
      return []
    }
    
    const processedLinks = processLinks(navLinks)
    console.log('Processed navigation links:', processedLinks)
    return processedLinks
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