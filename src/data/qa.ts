import { qaItem } from "@/types/types"

export const qaArray: qaItem[] = [{
  q: `What is Gotchiswap?`,
  a: `Gotchiswap is an OTC exchange dapp for Aavegotchi assets. It is built on top of the Aavegotchi ecosystem and allows users to trade Aavegotchis, wearables, and portals in a permissionless and trustless manner.`,
}, {
  q: `What are the next features that will be implemented`,
  a: `Next features should be, in order:

  * The ability to trade assets against any ERC20 token that belongs to the Aavegotchi ecosystem. This will allow users to gop some OTC with alchemicas or GLTR.
  * Include all aavegotchi ecosystem missing assets. Parcels, all forges items are the priority.
  * Last we would lile to allow users to trade assets vs assets. For example i could trade 1 gotchi + some wearables against another gotchi + GLTR.`
}, {
  q: `What technologies are used for the GotchiSwap dapp / frontend?`,
  a: `We used the following technologies:
  
  * NextJs 13 framework with Typescript.
  * TailwindCss for stylings
  * Wagmi.sh and Web3Modal for wallet connection and transactions.
  * Apollo + Codegen for the graphql client.`
}
]