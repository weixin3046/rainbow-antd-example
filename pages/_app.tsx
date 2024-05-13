import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { bsc, bscTestnet, opBNB, opBNBTestnet } from "wagmi/chains";
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { ConfigProvider } from "antd";

import theme from "../theme/themeConfig";
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import Layout from "./components/Layout";

// language
import "dayjs/locale/zh-cn";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import { RainbowKitProviderProps } from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitProvider";
import { useEffect } from "react";
import dayjs from "dayjs";
import { appWithTranslation } from "next-i18next";
import nextI18nConfig from "../next-i18next.config.mjs";
type locale = RainbowKitProviderProps["locale"];
import { useTranslation } from "next-i18next";

const config = getDefaultConfig({
  appName: "RainbowKit App",
  projectId: "2724d308a0ea7acb1238664e287e8e9b",
  chains: [
    bsc,
    bscTestnet,
    opBNB,
    opBNBTestnet,

    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: true,
  wallets: [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet, walletConnectWallet],
    },

    {
      groupName: "Others",
      wallets: [rainbowWallet, coinbaseWallet],
    },
  ],
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation("common");
  const { language } = i18n;
  dayjs.locale(language);
  return (
    <ConfigProvider theme={theme} locale={language === "en" ? enUS : zhCN}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider
            locale={language as locale}
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

export default appWithTranslation(MyApp, nextI18nConfig);
