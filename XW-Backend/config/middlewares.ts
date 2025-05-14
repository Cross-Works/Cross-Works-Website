export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
    {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['http://localhost:5173'], // Vite’s default port
      methods: ['GET','POST','PUT','PATCH','DELETE'],
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
