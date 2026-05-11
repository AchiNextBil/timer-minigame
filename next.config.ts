/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',

  basePath: '/achi/timer',
  assetPrefix: '/achi/timer',

  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */

// const nextConfig = {
//   output: 'export',

//   basePath: '',
//   assetPrefix: '',

//   images: {
//     unoptimized: true,
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
// };

// export default nextConfig;
