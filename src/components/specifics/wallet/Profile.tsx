import { useAccount } from 'wagmi'
import { Connected } from './Connected'
import { Web3Button } from '@web3modal/react'

export const Profile = () => {
  const { address, isConnected } = useAccount()
  return ((isConnected && address) ? <Connected /> : <Web3Button />)
}