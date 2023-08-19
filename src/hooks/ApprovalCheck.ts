import { useEffect, useState, useCallback, useContext } from "react";
import { ApprovableAsset, ApprovableWearable, SelectableAsset, Wearable } from "../types/types";
import { TxStatus } from "../helpers/enums";
import { aavegotchiAbi } from "../abis/aavegotchi";
import { wearableAbi } from "../abis/wearables";
import { multicall } from '@wagmi/core'
import { convertAddressType, isWearable } from "../helpers/tools";
import { useAccount } from "wagmi";
import { CartContext } from "@/contexts/CartContext";

const AavegotchiContract = {
  address: convertAddressType(process.env.NEXT_PUBLIC_AAVEGOTCHI_CONTRACT_ADDRESS),
  abi: aavegotchiAbi
}

const WearableContract = {
  address: convertAddressType(process.env.NEXT_PUBLIC_WEARABLE_CONTRACT_ADDRESS),
  abi: wearableAbi
}

export const useApprovalCheck = (): { approvableAssets: ApprovableAsset[], status: TxStatus } => {
  const [approvableAssets, setApprovableAssets] = useState<ApprovableAsset[]>([]);
  const [status, setStatus] = useState<TxStatus>(TxStatus.LOADING);
  const { address } = useAccount();
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    const processApproval = async () => {
      const gotchis: ApprovableAsset[] = cartCtx.assets
        .filter((asset) => asset.__typename === "Aavegotchi" || asset.__typename === "Portal")
        .map((gotchi) => { return { ...gotchi, approved: false } });

      const wearables: ApprovableAsset[] = cartCtx.assets
        .filter((asset) => isWearable(asset))
        .map((wearable) => {
          return { ...wearable, approved: false }
        })

      const calls: any[] = []

      const gotchiCalls = gotchis.map((gotchi) => {
        return {
          ...AavegotchiContract,
          functionName: 'getApproved',
          args: [BigInt(gotchi.id)]
        }
      })
      calls.push(...gotchiCalls)

      if (wearables.length > 0) {
        calls.push({
          ...WearableContract,
          functionName: 'isApprovedForAll',
          args: [address, process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS]
        })
      }

      try {
        await multicall({
          contracts: calls
        }).then((results) => {
          setStatus(TxStatus.SUCCESS);
          let isWearablesHandled = false
          const tmp: ApprovableAsset[] = []
          cartCtx.assets.forEach((asset, index) => {
            switch (asset.__typename) {
              case "wearable":
                if (!isWearablesHandled) {
                  const tmpWearables = wearables.map((wearable) => {
                    return { ...wearable, approved: results[index].result as boolean }
                  })
                  tmp.push(...tmpWearables)
                  isWearablesHandled = true
                }

                break
              case "Aavegotchi":
              case "Portal":
                tmp.push({ ...asset, approved: results[index].result === process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS })
                break
            }
          })
          setApprovableAssets(tmp)
        })
      } catch (error) {
        setStatus(TxStatus.ERROR);
      }
    }
    processApproval()
  }, [cartCtx.assets]);

  return { approvableAssets, status };
}


