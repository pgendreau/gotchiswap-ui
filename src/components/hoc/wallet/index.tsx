import ClientOnly from "@/components/generics/nextShit/ClientOnly";
import { ConnectWallet } from "@/components/specifics/pages/ConnectWallet";
import { PropsWithChildren } from "react";
import { useAccount } from "wagmi";

export const ConnectedCheck = (props: PropsWithChildren) => {
  const { isConnected, address } = useAccount();

  if (!isConnected || !address) {
    return <ClientOnly><ConnectWallet /></ClientOnly>
  }

  return <>
    {props.children}
  </>
}