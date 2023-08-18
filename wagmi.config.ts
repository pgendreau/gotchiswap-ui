import { defineConfig } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins'
import { polygon } from 'wagmi/chains'

export default defineConfig({
  out: 'src/contracts/_generated.ts',
  contracts: [],
  plugins: [
    etherscan({
      apiKey: "J216UIQZC5WPZNQIKD1CX38C8X8CVAQPAA",
      chainId: polygon.id,
      contracts: [
        // {
        //   name: 'Escrow',
        //   address: {
        //     [polygon.id]: '0xD54b603e5a93ECb7B72c2c8825Aa1091b6B0Bcc0'
        //   }
        // }, 
        {
          name: 'AavegotchiDiamond',
          address: '0x86935F11C86623deC8a25696E1C19a8659CbF95d'
        },
        {
          name: 'Wearables',
          address: "0x58de9AaBCaeEC0f69883C94318810ad79Cc6a44f"
        },
      ]
    }),
    react()
  ],
})
