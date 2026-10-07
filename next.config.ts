import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "standalone" is only for the Docker image; Vercel does its own packaging
  // and fails on the missing .next/next-server.js.nft.json when it is set.
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
};

export default nextConfig;
