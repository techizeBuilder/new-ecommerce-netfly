/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export to support API routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    domains: ['images.unsplash.com'],
    unoptimized: true 
  },
};

module.exports = nextConfig;