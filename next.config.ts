import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    USER_POOL_ID: process.env.USER_POOL_ID,
    USER_POOL_CLIENT_ID: process.env.USER_POOL_CLIENT_ID,
    USER_POOL_END_POINT: process.env.USER_POOL_END_POINT
  },
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
