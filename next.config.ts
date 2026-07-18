import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: typeof process !== 'undefined' ? process.cwd() : undefined,
  },
  allowedDevOrigins: ['10.20.27.180'],
};

export default nextConfig;
