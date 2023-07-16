import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { PropsWithChildren } from "react";
import { createPublicClient, http } from "viem";
import { polygon } from "viem/chains";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";

export const InjectWagmi = (props: PropsWithChildren) => {
  // const { chains, publicClient } = configureChains(
  //   [polygon],
  //   [publicProvider()],
  //   // [alchemyProvider({ apiKey: 'EJ6zUpMF_iE-s-oaFUdk3J_8jQunUrPo' }), publicProvider()],
  // )

  // const config = createConfig(
  //   getDefaultConfig({
  //     autoConnect: true,
  //     walletConnectProjectId: "0feff3f81d41f59c2705120f38efc5d6",
  //     alchemyId: "EJ6zUpMF_iE-s-oaFUdk3J_8jQunUrPo",
  //     appName: "Gotchiswap",
  //     appDescription: "AAvegotchi OTC trading Dapp",
  //     appUrl: "https://gotchiswap.xyz",
  //     appIcon: "https://gotchiswap.xyz/images/logo.png",
  //     publicClient: publicClient,
  //     connectors: [ new InjectedConnector({ chains })]
  //   })
  // );

  const config = createConfig(
    getDefaultConfig({
      autoConnect: true,
      walletConnectProjectId: "0feff3f81d41f59c2705120f38efc5d6",
      alchemyId: "EJ6zUpMF_iE-s-oaFUdk3J_8jQunUrPo",
      appName: "Gotchiswap",
      appDescription: "AAvegotchi OTC trading Dapp",
      appUrl: "https://gotchiswap.xyz",
      appIcon: "https://gotchiswap.xyz/images/logo.png",
      publicClient: createPublicClient({
        chain: polygon,
        transport: http(),
      }),
    })
  );


  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>{props.children}</ConnectKitProvider>
    </WagmiConfig>
  );
};
