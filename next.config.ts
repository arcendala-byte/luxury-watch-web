import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // use remotePatterns when needing dynamic image hosts
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
