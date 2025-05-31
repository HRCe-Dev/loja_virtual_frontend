import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  //output: 'export',
  // TODO: corrigir este config
  //The "images.domains" configuration is deprecated. Please use "images.remotePatterns" configuration instead.
  images: {
    unoptimized: true,
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dnptdd7su/image/upload/v1745072346/hrce/*",
      },
    ],
  },
  experimental: {
    allowedDevOrigins: ['http://192.168.213.6:3000'], // substitua pelo seu IP real
  },
};

export default nextConfig;
