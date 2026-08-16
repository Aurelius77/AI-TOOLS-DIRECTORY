/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/components/dashboard",
        destination: "/",
        permanent: false,
      },
      {
        source: "/components/homepage",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
