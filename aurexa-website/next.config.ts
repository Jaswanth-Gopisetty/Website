import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }], unoptimized: true },
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
