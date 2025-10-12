import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'landing-pages.ted.com',
      },
      {
        protocol: 'https',
        hostname: 'eulist.university',
      },
    ],
  },
  basePath: isProd ? '/TEDXXEULIST' : '',
};

export default nextConfig;
