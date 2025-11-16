import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  images: {
    // Required when using next/image with static exports
    unoptimized: true,
  },
};

export default nextConfig;
