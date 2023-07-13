import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'
import { Connected } from './Connected'

export const Profile = () => {
  const { address, isConnected } = useAccount()
  return ((isConnected && address) ? <Connected /> : <ConnectKitButton />)
}