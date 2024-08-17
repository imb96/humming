/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lastfm.freetls.fastly.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'is1-ssl.mzstatic.com',
        port: '',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://api.musixmatch.com/ws/1.1/:path*`,
      },
    ]
  },
}

export default nextConfig
