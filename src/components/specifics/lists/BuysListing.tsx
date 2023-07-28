import { escrowAbi } from "@/abis/escrow";
import { convertAddressType } from "@/helpers/tools";
import { Sale } from "@/types/types";
import { readContract } from "@wagmi/core";
import { useCallback, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { BuysPicker } from "./BuysPicker";
import { TxContext } from "@/contexts/TxContext";

export const BuysListing = () => {
  
  const { address, isConnected } = useAccount();
  const [offers, setOffers] = useState<Sale[]>([]);
  const txContext = useContext(TxContext);
  
  const getOffers = useCallback(async () => {
    if (isConnected && address && address.startsWith("0x")) {
      const buyersSaleCount = await readContract({
        address: convertAddressType(
          process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS
        ),
        abi: escrowAbi,
        functionName: "getBuyerSalesCount",
        args: [address],
      });

      if (!buyersSaleCount) {
        return [];
      }

      const offersData:Array<Sale> = [];
      for (let i = 0; i < buyersSaleCount; i++) {
        const offer = await readContract({
          address: convertAddressType(
            process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS
          ),
          abi: escrowAbi,
          functionName: "getOffer",
          args: [address, BigInt(i)],
        });

        const seller = offer[0];
        const sale = await readContract({
          address: convertAddressType(
            process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS
          ),
          abi: escrowAbi,
          functionName: "getSale",
          args: [seller, BigInt(i)], 
        })
        offersData.push({id: sale[0], priceInWei: sale[2], assetId: sale[1], seller:seller, index: BigInt(i)});
      }
      return offersData;
    }
    return []
  }, [address, isConnected]);

  useEffect(() => {
    if ((isConnected && address && address.startsWith("0x")) || txContext?.txContextValue.status === "success") {
      getOffers().then((offers) => {
        setOffers(offers);
      }).catch((error) => {
        setOffers([]);
      })
    }
  }, [getOffers, setOffers, address, isConnected, txContext?.txContextValue.status]);

  if (!offers || (offers && offers.length === 0)) {
    return <>No Offers</>;
  }

  return <BuysPicker sales={offers} />;

};
