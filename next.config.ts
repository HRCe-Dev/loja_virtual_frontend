import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Adicione o domínio aqui
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dnptdd7su/image/upload/v1745072346/hrce/*", // Adicionado '*' para incluir qualquer arquivo dentro do diretório hrce
      },
    ],
  },
};

export default nextConfig;
