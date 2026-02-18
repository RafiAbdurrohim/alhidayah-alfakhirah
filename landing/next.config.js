/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/i18n/config.ts");

const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  reactStrictMode: true,
  // Disable static optimization for all pages
  experimental: {
    appDir: true,
  },
  // Force all pages to be dynamic
  generateBuildId: async () => {
    return "vercel-dynamic-build";
  },
};

module.exports = withNextIntl(nextConfig);
