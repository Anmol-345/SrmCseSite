/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['mongodb', 'bcryptjs'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('mongodb', 'bcryptjs');
    }
    return config;
  },
}

export default nextConfig