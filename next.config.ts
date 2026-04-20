import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/**
 * Dev runs **without** `output: "export"` and **without** Turbopack by default. That combination avoids manifest
 * races (ENOENT on `app-build-manifest.json`, `_buildManifest.js.tmp.*`) seen with `next dev --turbopack` + static
 * export.
 *
 * `output: "export"` applies only for production `next build` (GitHub Pages). Don’t edit this file while the dev
 * server is running — Next restarts and can race with in-flight requests against `.next/`.
 *
 * GitHub Pages: `NEXT_BASE_PATH=/TEDXXEULIST npm run build`. Local dev: leave unset (serves `/`).
 */
const basePath =
  process.env.NEXT_BASE_PATH?.replace(/\/$/, "") ??
  (isProd ? "/TEDXXEULIST" : "");

const nextConfig: NextConfig = {
  ...(isProd ? { output: "export" as const } : {}),
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
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
  },
};

export default nextConfig;
