import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/gyeonggi-civic-wallet-demo",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
