import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://frontend-task-chatapp.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;

