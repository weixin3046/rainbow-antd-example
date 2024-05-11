import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { bsc, bscTestnet, opBNB, opBNBTestnet } from "wagmi/chains";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ConfigProvider } from "antd";

import theme from "./theme/themeConfig";
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

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
  return (
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
