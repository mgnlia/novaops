import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
    // Skip ESLint during production builds — no eslint config in this project
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type-check locally, don't block Vercel deploys
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
