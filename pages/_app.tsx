import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { darkTheme, Locale, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ConfigProvider } from "antd";

import theme from "../theme/themeConfig";

import Layout from "./components/Layout";

// language
import "dayjs/locale/zh-cn";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import { RainbowKitProviderProps } from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitProvider";
import dayjs from "dayjs";
type locale = RainbowKitProviderProps["locale"];
import { useRouter } from "next/router";
import { config } from "../config";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter() as { locale: Locale };
  dayjs.locale(locale);

  return (
    <ConfigProvider theme={theme} locale={locale === "en" ? enUS : zhCN}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider
            locale={locale}
            // theme={darkTheme()}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ConfigProvider>
  );
}

export default MyApp;
