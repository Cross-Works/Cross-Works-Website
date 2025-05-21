'use strict';

/**
 * This script sets public permissions for all content types to make them accessible via API
 * Run with: node scripts/set-permissions.js
 */

async function setPublicPermissions() {
  // Find the ID of the public role
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  // Get all content types
  const contentTypes = Object.keys(strapi.contentTypes)
    .filter(key => key.startsWith('api::'))
    .map(key => key.replace('api::', ''));

  // Update permissions for each content type
  for (let contentType of contentTypes) {
    // The controller names are in singular
    const controller = contentType.includes('-') ? 
      contentType.replace(/-/g, '.') : 
      contentType;

    // Create permissions object
    const newPermissions = {
      // Enable find and findOne actions for the content type
      [`plugin::users-permissions.controllers.${controller}.find`]: { enabled: true },
      [`plugin::users-permissions.controllers.${controller}.findOne`]: { enabled: true },
    };

    // Update permissions for the public role
    await strapi.query('plugin::users-permissions.permission').updateMany({
      where: {
        action: [`api::${contentType}.${contentType}.find`, `api::${contentType}.${contentType}.findOne`],
        role: publicRole.id,
      },
      data: { enabled: true },
    });

    console.log(`✅ Enabled public permissions for ${contentType}`);
  }

  console.log('🎉 Public permissions set successfully!');
}

module.exports = {
  setPublicPermissions,
};

// Run if called directly (node scripts/set-permissions.js)
if (require.main === module) {
  // Bootstrap Strapi
  require('strapi')().start().then(() => {
    setPublicPermissions().then(() => {
      process.exit(0);
    });
  });
} 