import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/baerae-demo",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
