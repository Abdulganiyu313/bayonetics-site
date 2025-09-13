/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "graph.facebook.com" },
      { protocol: "https", hostname: "scontent.*" },
      { protocol: "https", hostname: "**.pexels.com" },
      { protocol: "https", hostname: "**.unsplash.com" },
      { protocol: "https", hostname: "avonmore-electrical.com" }, // ✅ add this
      { protocol: "https", hostname: "www.avonmore-electrical.com" }, // (optional) if it redirects
    ],
  },
};
export default nextConfig;
