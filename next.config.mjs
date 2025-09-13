/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow Facebook avatar redirect target and stock sources we’ll use later
    remotePatterns: [
      { protocol: "https", hostname: "graph.facebook.com" },
      { protocol: "https", hostname: "scontent.*" },
      { protocol: "https", hostname: "**.pexels.com" },
      { protocol: "https", hostname: "**.unsplash.com" },
    ],
  },
};
export default nextConfig;
