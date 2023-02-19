/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "easy.unikmarketing.org",
        port: "",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "backendapi.flip.onl",
        port: "",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "afri-health-bucket.s3.us-east-2.amazonaws.com",
        port: "",
        pathname: "/product-category/**",
      },
    ],
  },

  // redirects: async () =>{
  //   returyar de                           n [
  //     {
  //       source: '/about',
  //       destination: '/',
  //       permanent: 'false'
  //     }
  //   ]
  // }
};

module.exports = nextConfig;
