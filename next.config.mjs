/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Somente rotas que começam com /api
        destination: 'http://18.208.175.110:8888/:path*', // Proxy para sua API HTTP
      },
    ];
  },
};

export default nextConfig;
