/**
 * @typedef {Object} Category
 * @property {number} id
 * @property {string} name
 * @property {string} slug - e.g. 'news', 'design', 'tech', 'homepage'
 */

/**
 * @typedef {Object} Card
 * @property {number} id
 * @property {string} title
 * @property {(string|Array|null)} description
 * @property {string} slug
 * @property {string|null} publishedDate
 * @property {Object|null} image
 * @property {number} image.id
 * @property {string} image.url
 * @property {string|null} image.alternativeText
 * @property {Category[]} categories
 * @property {Object} [link]
 * @property {number} link.id
 * @property {string} link.slug
 * @property {string} link.documentId
 */
 
/**
 * @typedef {Object} Block
 * @property {number} id
 * @property {string} Title
 * @property {Array} Description
 * @property {Array<{id: number, url: string, alternativeText: string|null}>} Media
 * @property {Category[]} categories
 */

export {} 