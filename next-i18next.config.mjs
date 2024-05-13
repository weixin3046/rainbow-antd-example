import path from "path";

/** @type {import("next-i18next").UserConfig} */
const config = {
  debug: process.env.NODE_ENV === "development",
  reloadOnPrerender: process.env.NODE_ENV === "development",
  i18n: {
    locales: ["en", "zh-CN"],
    defaultLocale: "zh-CN",
  },
  localePath: path.resolve("./public/locales"),
};
export default config;
