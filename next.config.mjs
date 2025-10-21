/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Do NOT fail the Vercel build because of lint issues.
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Keep TypeScript checks (recommended). If you still hit TS build errors later,
  // you can temporarily set ignoreBuildErrors: true — but try to keep it false.
  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "graph.facebook.com" },
      { protocol: "https", hostname: "scontent.cdninstagram.com" },
      { protocol: "https", hostname: "scontent.*" },
      { protocol: "https", hostname: "*.pexels.com" },
      { protocol: "https", hostname: "*.unsplash.com" },
    ],
  },
};

export default nextConfig;
