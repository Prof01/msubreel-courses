/** @type {import('next').NextConfig} */
// const withPWA = require('next-pwa');
// const runtimeCaching = require("next-pwa/cache");
const securityHeaders = [
  {
    key: 'Cache-Control',
    value: 'no-store',
  },
  {
      key: 'X-DNS-Prefetch-Control',
      value: 'on'
  },
  {
      key: 'X-XSS-Protection',
      value: '1; mode=block'
  },
  {
      key: 'X-Frame-Options',
      value: 'SAMEORIGIN'
  },
  
]

const nextConfig = {
  // pwa: {
  //     dest: "public",
  //     register: true,
  //     skipWaiting: true,
  //     runtimeCaching,
  //     // buildExcludes: [/middleware-manifest.json$/],
  //     disable: process.env.NODE_ENV === 'development'
  // },
  images: {
      domains: [process.env.IMAGES_DOMAINS1, process.env.IMAGES_DOMAINS2, process.env.IMAGES_DOMAINS3 ],
      // loader can be 'default', 'imgix', 'cloudinary', 'akamai', or 'custom'
      loader: 'default',
  },
  async rewrites() {
      return [
          {
              source: process.env.SOURCE,
              destination: process.env.BACK_END,
              // destination: 'http://localhost:5000/api/v1/:slug*'
          }
      ]
  },
  async headers() {
      return [
        {
          // Apply these headers to all routes in your application.
          source: '/(.*)',
          headers: securityHeaders,
        },
      ]
    },
}

export default nextConfig
