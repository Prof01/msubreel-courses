/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    // buildExcludes: [/middleware-manifest.json$/],
    disable: process.env.NODE_ENV === 'development'
  })
  
  const securityHeaders = [
    { key: 'X-DNS-Prefetch-Control', value: 'on' },
    { key: 'X-XSS-Protection', value: '1; mode=block' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  ];
  
  module.exports = withPWA({
    async rewrites() {
      return [
        {
          destination: process.env.BACK_END,
          source: process.env.SOURCE,
        },
      ];
    },
    images: {
      domains: ['images.unsplash.com', 'tailwindui.com', 's3.amazonaws.com', 'res.cloudinary.com', 'img.youtube.com'],
      loader: 'default',
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
      ];
    },
  });
  
  