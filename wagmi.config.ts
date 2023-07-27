import { defineConfig } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins'
import { polygonMumbai } from 'wagmi/chains'

export default defineConfig({
  out: 'src/contracts/_generated.ts',
  contracts: [],
  plugins: [
    etherscan({
      apiKey: "J216UIQZC5WPZNQIKD1CX38C8X8CVAQPAA",
      chainId: polygonMumbai.id,
      contracts: [
        {
          name: 'Escrow',
          address: {
            [polygonMumbai.id]: '0xD54b603e5a93ECb7B72c2c8825Aa1091b6B0Bcc0'
          }
        }
      ]
    }),
    react()
  ],
})
