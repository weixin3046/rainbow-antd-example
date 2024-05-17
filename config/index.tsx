import { bsc, bscTestnet, opBNB, opBNBTestnet } from "viem/chains";
import { http, createConfig } from "@wagmi/core";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

export const config = getDefaultConfig({
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
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
    [opBNB.id]: http(),
    [opBNBTestnet.id]: http(),
  },
});

export const tokenList = [
  {
    name: "PEG",
    symbol: "PEG",
    address: "0xF583DeC8888c83A46FF5756ccEe07242c22D5c75",
    decimals: 6,
  },
  {
    name: "THKD1",
    symbol: "THKD1",
    address: "0xbf5830baE7cc5Eb0f409b92851dB62BC1483bc9A",
    decimals: 6,
  },
];

export const MultiSigBankAddress = "0xCaFCA685891A2CeFbf78F89BeA3EaA9B096d377B";
