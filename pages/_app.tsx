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
import { Button, ConfigProvider, ConfigProviderProps } from "antd";

import theme from "./theme/themeConfig";
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import Layout from "./components/Layout";

// language
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import { RainbowKitProviderProps } from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitProvider";
// import { useRouter } from "next/router";

type locale = RainbowKitProviderProps["locale"];

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
  // const { locale } = useRouter() as { locale: locale };
  // console.log(locale);
  return (
    // <ConfigProvider
    //   theme={theme}
    //   // locale={locale === "en" ? enUS : zhCN}
    // >
    //   <WagmiProvider config={config}>
    //     <QueryClientProvider client={client}>
    //       <RainbowKitProvider
    //       // locale={locale}
    //       // theme={darkTheme()}
    //       >
    //         <Layout>
    //           <Component {...pageProps} />
    //         </Layout>
    //       </RainbowKitProvider>
    //     </QueryClientProvider>
    //   </WagmiProvider>
    // </ConfigProvider>
    <ConfigProvider theme={theme}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ConfigProvider>
  );
}

export default MyApp;
