const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['static.coupangcdn.com'],
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
    buildExcludes: [/middleware-manifest.json$/],
  },
});
