/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c.saavncdn.com",
      },
      {
        protocol: "https",
        hostname: "c.sop.saavncdn.com",
      },
      {
        protocol: "https",
        hostname: "www.jiosaavn.com",
      },
      {
        protocol: "https",
        hostname: "pli.saavncdn.com",
      },
      {
        protocol: "http",
        hostname: "c.saavncdn.com",
      },
      {
        protocol: "http",
        hostname: "pli.saavncdn.com",
      },
      {
        protocol: "http",
        hostname: "c.sop.saavncdn.com",
      },
    ],
  },
};

export default nextConfig;
