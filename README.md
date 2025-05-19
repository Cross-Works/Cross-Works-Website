# Cross-Works Website (Vue.js)

This is the Cross-Works Website built with Vue.js, connecting to a Strapi backend to display content.

## Technology Stack

- Vue.js 3 (with Composition API)
- Vue Router for navigation
- Axios for API requests
- Sass for advanced styling
- Vite for building and development

## Project Structure

- `src/components/` - Reusable UI components
- `src/views/` - Page components
- `src/composables/` - Vue composition API utilities
- `src/router/` - Route definitions
- `src/assets/scss/` - Sass styles and variables
- `old-react-version/` - Original React implementation (archived)

## Sass Structure

The project uses Sass for enhanced styling capabilities:

- `src/assets/scss/_variables.scss` - Shared variables (colours, spacing, etc.)
- `src/assets/scss/main.scss` - Global styles and utility classes

Components use scoped Sass styles with the `lang="scss"` attribute and import variables as needed.

## Development

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Backend Connection

The frontend connects to a Strapi CMS backend running on port 1337 by default. Make sure the backend server is running before starting the frontend.

## Original React Version

The original React implementation has been archived in the `old-react-version/` directory for reference.
