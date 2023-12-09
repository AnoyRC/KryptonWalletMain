"use client";
import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { baseGoerli, goerli, polygon, polygonMumbai } from "wagmi/chains";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { oAuthConnector } from "@/wagmi/oAuthConnector";
import { alchemyProvider } from "wagmi/providers/alchemy";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygon, polygonMumbai, baseGoerli],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
    new oAuthConnector({
      chains,
      options: {
        domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
        clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

export const WagmiProvider = ({ children }) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};
