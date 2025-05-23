import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const STRAPI_URL = (import.meta as any).env?.VITE_STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_KEY = '8861150253f51cd7bcead9f1c8475c53f4893e0044d98ecacaba04a5131d85f71c01cfbbc9bb765a8acdd7d48108565c0544b7d10c26815bfa42c07d7f08a2c63a9ce8454f437dbd9f622155c328bab02df6c4b1215cf8f2b970a5f25590a31fb006ae790a69fbe76255b638d1fa724b381551b8f7a41f6e9e9db04c7c7b7d73'

interface LoadingState {
  global: boolean
  homepage: boolean
}

interface ErrorState {
  global: string | null
  homepage: string | null
}

interface NavigationLink {
  text: string
  url: string
  isExternal: boolean
}

interface CardLink {
  text: string
  url: string
  isExternal: boolean
}

interface HomepageCard {
  id: string | number
  heading: string
  description: string
  thumbnail: string | null
  link: CardLink
}

interface FeaturedMedia {
  url: string | null
  alt: string
}

interface SiteInfo {
  name: string
  description: string
  favicon: string | null
}

export const useStrapiStore = defineStore('strapi', () => {
  // State
  const globalData = ref<any>(null)
  const homepageData = ref<any>(null)
  const loading = ref<LoadingState>({
    global: false,
    homepage: false
  })
  const errors = ref<ErrorState>({
    global: null,
    homepage: null
  })

  // Helper function to make API calls
  const fetchFromStrapi = async (endpoint: string): Promise<any> => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      }

      if (STRAPI_API_KEY) {
        headers['Authorization'] = `Bearer ${STRAPI_API_KEY}`
      }

      const response = await axios.get(`${STRAPI_URL}${endpoint}`, { headers })
      return response.data
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error)
      throw error
    }
  }

  // Helper function to get image URL
  const getImageUrl = (image: any): string | null => {
    if (!image) return null
    
    // Handle different possible structures
    let asset = null
    if (image.Asset) {
      asset = image.Asset
    } else if (image.data) {
      asset = image.data
    } else {
      asset = image
    }
    
    if (!asset) return null
    
    // Get the URL from various possible locations
    let url = null
    if (asset.attributes?.url) {
      url = asset.attributes.url
    } else if (asset.url) {
      url = asset.url
    }
    
    if (!url) return null
    
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
  }

  // Actions
  const fetchGlobalData = async (): Promise<void> => {
    loading.value.global = true
    errors.value.global = null
    
    console.log('Fetching global data...')
    
    try {
      const data = await fetchFromStrapi('/api/global?populate=*')
      console.log('Global data received:', data)
      globalData.value = data
    } catch (error) {
      console.error('Error fetching global data:', error)
      errors.value.global = error instanceof Error ? error.message : 'Unknown error'
    } finally {
      loading.value.global = false
    }
  }

  const fetchHomepageData = async (): Promise<void> => {
    loading.value.homepage = true
    errors.value.homepage = null
    
    try {
      const data = await fetchFromStrapi('/api/homepage?populate=*')
      homepageData.value = data
    } catch (error) {
      errors.value.homepage = error instanceof Error ? error.message : 'Unknown error'
    } finally {
      loading.value.homepage = false
    }
  }

  // Computed - Navigation
  const navigation = computed((): NavigationLink[] => {
    if (!globalData.value?.data?.attributes?.Navigation?.Link) return []
    
    const navLinks = globalData.value.data.attributes.Navigation.Link
    
    return navLinks.map((link: any) => ({
      text: link.Text || '',
      url: link.Slug ? (link.Slug === 'home' ? '/' : `/${link.Slug}`) : '/',
      isExternal: false
    }))
  })

  // Computed - Homepage Cards
  const homepageCards = computed((): HomepageCard[] => {
    if (!homepageData.value?.data?.attributes?.Cards?.Card) return []
    
    const cardsData = homepageData.value.data.attributes.Cards.Card
    
    return cardsData.map((card: any) => ({
      id: card.id || Math.random(),
      heading: card.Heading || '',
      description: card.Description || '',
      thumbnail: getImageUrl(card.Thumbnail),
      link: {
        text: card.Link?.Text || '',
        url: card.Link?.Slug ? `/${card.Link.Slug}` : '/',
        isExternal: false
      }
    }))
  })

  // Computed - Homepage Cards Title
  const homepageCardsTitle = computed((): string => {
    return homepageData.value?.data?.attributes?.Cards?.Title || 'What we do'
  })

  // Computed - Featured Media
  const featuredMedia = computed((): FeaturedMedia | null => {
    const video = homepageData.value?.data?.attributes?.Video
    if (!video) return null
    
    return {
      url: getImageUrl(video),
      alt: video.Caption || 'Featured image'
    }
  })

  // Computed - Site Info
  const siteInfo = computed((): SiteInfo => {
    if (!globalData.value?.data?.attributes) return {
      name: 'Cross Works',
      description: '',
      favicon: null
    }
    
    const attrs = globalData.value.data.attributes
    return {
      name: attrs.siteName || 'Cross Works',
      description: attrs.siteDescription || '',
      favicon: attrs.favicon?.data?.attributes?.url || null
    }
  })

  // Computed - Footer
  const footer = computed(() => {
    return globalData.value?.data?.attributes?.Footer || null
  })

  // Initialize data on store creation
  const initialize = async (): Promise<void> => {
    await Promise.all([
      fetchGlobalData(),
      fetchHomepageData()
    ])
  }

  return {
    // State
    globalData,
    homepageData,
    loading,
    errors,
    
    // Actions
    fetchGlobalData,
    fetchHomepageData,
    initialize,
    getImageUrl,
    
    // Computed
    navigation,
    homepageCards,
    homepageCardsTitle,
    featuredMedia,
    siteInfo,
    footer
  }
}) 