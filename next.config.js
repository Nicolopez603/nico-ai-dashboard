/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    // Agregar esta configuración para ignorar las advertencias de ws
    config.ignoreWarnings = [
      { module: /node_modules\/ws\/lib\// }
    ];
    
    return config;
  },
};

module.exports = nextConfig; 