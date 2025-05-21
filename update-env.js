const fs = require('fs');

// Define the environment variables
const envContent = `VITE_STRAPI_URL=http://localhost:1337
VITE_STRAPI_API_KEY=8861150253f51cd7bcead9f1c8475c53f4893e0044d98ecacaba04a5131d85f71c01cfbbc9bb765a8acdd7d48108565c0544b7d10c26815bfa42c07d7f08a2c63a9ce8454f437dbd9f622155c328bab02df6c4b1215cf8f2b970a5f25590a31fb006ae790a69fbe76255b638d1fa724b381551b8f7a41f6e9e9db04c7c7b7d73
VITE_USE_MOCK_DATA=false
`;

// Write to .env file
fs.writeFileSync('.env', envContent);

console.log('Environment variables have been updated successfully.'); 