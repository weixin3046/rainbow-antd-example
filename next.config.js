/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["default", "en", "zh-CN"],
    defaultLocale: "default",
  },
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table",
  ],
};

module.exports = nextConfig;
