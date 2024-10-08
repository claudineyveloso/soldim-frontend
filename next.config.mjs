/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*', // Somente rotas que começam com /api
        destination: 'https://soldim-api.uaicloud.com.br/:path*', // Proxy para sua API HTTP
      },
    ];
  },
};

export default nextConfig;
