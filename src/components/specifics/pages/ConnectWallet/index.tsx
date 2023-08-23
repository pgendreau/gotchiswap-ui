import { Web3Button, Web3Modal } from "@web3modal/react"

export const ConnectWallet = () => {
  return <div className="flex flex-col gap-y-10">
    <p className="text-2xl">
    Welcome to Gotchiswap. Please connect your wallet to start using the dapp.
    </p>
    <div className="self-center">
    <Web3Button />
    </div>
  </div>
}