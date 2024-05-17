/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // i18n: {
  //   locales: ["en", "zh-CN"],
  //   defaultLocale: "zh-CN",
  // },
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

export default nextConfig;
