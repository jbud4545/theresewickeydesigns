import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Let Bytescale handle resizing/format conversion via its Image Processing API.
    // Next.js still handles <Image> layout, lazy-loading, and placeholder blur,
    // but the actual pixel-serving is offloaded to Bytescale's CDN.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upcdn.io",
      },
    ],
  },
}

export default nextConfig
