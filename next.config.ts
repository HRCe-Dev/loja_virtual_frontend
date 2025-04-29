import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO: corrigir este config
  //The "images.domains" configuration is deprecated. Please use "images.remotePatterns" configuration instead.
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dnptdd7su/image/upload/v1745072346/hrce/*",
      },
    ],
  },
};

export default nextConfig;
