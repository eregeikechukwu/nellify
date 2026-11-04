/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  sassOptions: { includePaths: ['./src/styles'] },
};
export default nextConfig;
