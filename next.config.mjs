/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "plus.unsplash.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "m.media-amazon.com" },
      { hostname: "www.kayazar.com" },
      { hostname: "img.freepik.com" },
      { hostname: "medex.com.bd" },
      { hostname: "*" },
    ],
  },
};

export default nextConfig;
