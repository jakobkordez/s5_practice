const withPwa = require('next-pwa')({
  dest: 'public',
  sw: 'service-worker.js',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = withPwa(nextConfig);
