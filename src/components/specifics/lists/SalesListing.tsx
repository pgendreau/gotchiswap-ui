import { escrowAbi } from "@/abis/escrow";
import { PortalFieldsFragment, PortalStatus, usePortalsByIdQuery, usePortalsQuery } from "@/graphql/core/__generated__/types";
import { convertAddressType } from "@/helpers/tools";
import { Sale, SaleContractResponse } from "@/types/types";
import { readContract } from "@wagmi/core";
import { useCallback, useEffect, useState } from "react";
import { readContracts, useAccount, useContractRead } from "wagmi";
import { SalesPicker } from "./SalesPicker";

export const SalesListing = () => {
  
  const { address, isConnected } = useAccount();
  const [sales, setSales] = useState<Sale[]>([]);

  const getSales = useCallback(async (): Promise<Sale[]> => {
    const offers = [];
    if (isConnected && address && address.startsWith("0x")) {
      const sellerSaleCount = await readContract({
        address: convertAddressType(
          process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS
        ),
        abi: escrowAbi,
        functionName: "getSellerSalesCount",
        args: [address],
      });

      if (!sellerSaleCount) {
        return [];
      }
      
      const offers: Array<readonly [bigint, bigint, bigint, `0x${string}`, bigint]> = [];
      for (let i = 0; i < sellerSaleCount; i++) {
        const offer = await readContract({
          address: convertAddressType(
            process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS
          ),
          abi: escrowAbi,
          functionName: "getSale",
          args: [address, BigInt(i)],
        });
        offers.push([...offer, BigInt(i)]);
      }

      return offers.map((offer):Sale => {
        return {
          id: offer[0],
          priceInWei: offer[2],
          assetId: offer[1],
          seller: offer[3],
          index: offer[4]
        }
      })
    }
    return []
  }, [address, isConnected]);

  useEffect(() => {
    if (isConnected && address && address.startsWith("0x")) {
      getSales().then((sales) => {
        setSales(sales);
      }).catch((error) => {
        console.log(error)
      })
    }
  }, [getSales, address, isConnected]);

  if (!sales || (sales && sales.length === 0)) {
    return <>No Sales</>;
  }

  return (<SalesPicker sales={sales} />)
};
