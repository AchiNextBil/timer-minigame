/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',

  basePath: '/achi/questions',
  assetPrefix: '/achi/questions',

  images: {
    unoptimized: true,
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */

// const nextConfig = {
//   output: "export",

//   basePath: "",
//   assetPrefix: "",

//   images: {
//     unoptimized: true,
//   },
// }

// // export default nextConfig
