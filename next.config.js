/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // for security reasons, be as specific as poss.
      {
        protocol: 'https',
        hostname: 'www.gstatic.com',
      },
    ],
  },
}

module.exports = nextConfig
