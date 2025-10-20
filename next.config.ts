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
      {
        protocol: 'https',
        hostname: 'www.imt-atlantique.fr',
      },
      {
        protocol: 'https',
        hostname: 'www.fondation-mines-telecom.org',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'www.union-eleves-imt.org',
      },
    ],
  },
  basePath: isProd ? '/TEDXXEULIST' : '',
};

export default nextConfig;
