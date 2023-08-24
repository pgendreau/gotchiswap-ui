import { escrowAbi } from "@/abis/escrow"
import { convertAddressType, isAddressValid, isGetSaleResult, saleItemDTO } from "@/helpers/tools"
import { SaleItem, SaleV2 } from "@/types/types"
import { use, useEffect, useState } from "react"
import { readContract, multicall } from "@wagmi/core";
import { useAccount } from "wagmi"
import { gotchiswapAbi } from "@/abis/gotchiswap-abi";



export const useBuys = (): { buys: SaleV2[], isLoading: boolean } => {
  const { address } = useAccount()
  const [buys, setBuys] = useState<SaleV2[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const otcContract = {
    address: process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS,
    abi: gotchiswapAbi
  }

  useEffect(() => {
    const getBuys = async () => {
      if (!address) return []

      // sale array. But we call it buys because we are the buyer....
      const buys: SaleV2[] = []

      try {
        // Initial getBuyerOffersCount call
        const buyerSaleCount = await readContract({
          address: convertAddressType(
            process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS
          ),
          abi: gotchiswapAbi,
          functionName: "getBuyerOffersCount",
          args: [address],
        });


        if (!buyerSaleCount) {
          return [];
        }

        //prepare multiCall of getOffer
        const tmpSales: SaleV2[] = []
        const getOfferCalls: any[] = []

        for (let i = 0; i < buyerSaleCount; i++) {
          // We need to fetch the sales one by one
          getOfferCalls.push({
            ...otcContract,
            functionName: 'getOffer',
            args: [address, BigInt(i)]
          })
        }

        // multicall of getOffer
        const getOffersResults = await multicall({
          contracts: getOfferCalls
        })

        // fetch results of getOffer multicall to prepare multicall of getSaleIndex
        const getSaleIndexCalls: any[] = []
        for (const offer of getOffersResults) {
          if (Array.isArray(offer.result) &&
            offer.result[0] &&
            typeof offer.result[0] === 'string' &&
            isAddressValid(offer.result[0]) &&
            offer.result[1] &&
            typeof offer.result[1] === 'bigint') {
            // We populate buys array from here, we will feed missing data later
            buys.push({
              id: offer.result[1],
              seller: offer.result[0],
              buyer: address,
              index: BigInt(0),
              assets: [],
              prices: []
            })

            getSaleIndexCalls.push({
              ...otcContract,
              functionName: 'getSaleIndex',
              args: [offer.result[0], offer.result[1]]
            })
          }
        }
        // getSaleIndex multicall
        const getSaleIndexResults = await multicall({
          contracts: getSaleIndexCalls
        })

        const getSaleCalls: any[] = []
        for (let i = 0; i < getSaleIndexResults.length; i++) {
          const result = getSaleIndexResults[i].result

          if (typeof result === 'bigint') {
            buys[i].index = result
            getSaleCalls.push({
              ...otcContract,
              functionName: 'getSale',
              args: [buys[i].seller, buys[i].index]
            })
          }
        }

        const getSaleResults = await multicall({
          contracts: getSaleCalls
        })

        // Only issue with multicall is the fact that wagmi returns non typed objects....
        // So i have to type check everything here
        // It's gonna be tedious but it's the only way to make it work
        for (let i = 0; i < getSaleResults.length; i++) {
          const result = getSaleResults[i].result
          if (isGetSaleResult(result)) {
            for (let j = 0; j < result[1].length; j++) {
              if (result[1][j] >= 0 && result[1][j] <= 2) {
                buys[i].assets.push(saleItemDTO(result[1][j] as 0 | 1 | 2, result[2][j], result[3][j], result[4][j]))
              }
            }
            for (let j = 0; j < result[5].length; j++) {
              if (result[5][j] >= 0 && result[5][j] <= 2) {
                buys[i].prices.push(saleItemDTO(result[5][j] as 0 | 1 | 2, result[6][j], result[7][j], result[8][j]))
              }
            }
          }
        }
        return buys
      } catch (e) {
        console.log(e)
        return []
      }
    }

    getBuys().then((result) => { setBuys(result); setIsLoading(false) })
  }, [address])

  return { buys, isLoading }
}