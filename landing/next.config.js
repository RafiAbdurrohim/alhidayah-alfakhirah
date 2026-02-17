/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require("next-intl/plugin");

// Specify the path to i18n config file
const withNextIntl = createNextIntlPlugin("./src/i18n/config.ts");

const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  reactStrictMode: true,
};

module.exports = withNextIntl(nextConfig);
