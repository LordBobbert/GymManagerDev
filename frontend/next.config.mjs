// next.config.mjs

export default {
  // Enabling React's strict mode
  reactStrictMode: true,
  
  // Specify file extensions for pages
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  // Environment variables
  env: {
      NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },

  // Add any other custom configurations you need here
};
