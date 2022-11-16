/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "example.com",
  //       port: "",
  //       pathname: "/account123/**",
  //     },
  //   ],
  // },
  // redirects: async () =>{
  //   return [
  //     {
  //       source: '/about',
  //       destination: '/',
  //       permanent: 'false'
  //     }
  //   ]
  // }
};

module.exports = nextConfig;
