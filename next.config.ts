import type { NextConfig } from "next";

/** Override for GitHub Pages, e.g. `NEXT_BASE_PATH=/TEDXXEULIST npm run build`. Local dev: leave unset (serves `/`). */
const basePath =
  process.env.NEXT_BASE_PATH?.replace(/\/$/, "") ??
  (process.env.NODE_ENV === "production" ? "/TEDXXEULIST" : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath,
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

  /**
   * Avoid stale webpack chunk manifests after `rm -rf .next` / concurrent writes
   * (dev-only "Cannot find module './NNN.js'" from webpack-runtime).
   */
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
