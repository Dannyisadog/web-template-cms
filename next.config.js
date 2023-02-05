/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: { 
    outputFileTracing: true 
  }
}

module.exports = nextConfig
