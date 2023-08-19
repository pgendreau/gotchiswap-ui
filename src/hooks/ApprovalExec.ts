import { aavegotchiAbi } from "@/abis/aavegotchi";
import { wearableAbi } from "@/abis/wearables";
import { TxContext, TxContextType } from "@/contexts/TxContext";
import { ApprovableAsset } from "@/types/types";
import { prepareWriteContract, writeContract, waitForTransaction } from "@wagmi/core";
import { useContext, useEffect, useState } from "react";

export const useApprovalExec = (approvableAssets: ApprovableAsset[]) => {
  const [approvedAssets, setApprovedAssets] =  useState<ApprovableAsset[]>(approvableAssets)
  const [status, setStatus] = useState<TxStatus>(TxStatus.LOADING);
  const txContext = useContext(TxContext)

  useEffect(() => {
    const processTx = async () => {
      // Let's prepare tx then store them in the request array.
      approvedAssets.filter(asset => asset.__typename !== 'wearable' && !asset.approved).forEach(async (asset) =>  {
        const preparedTx = await prepareWriteContract({
          address: process.env.NEXT_PUBLIC_AAVEGOTCHI_CONTRACT_ADDRESS,
          abi: aavegotchiAbi,
          functionName: 'approve',
          args: [
            process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS,
            BigInt(asset.id)
          ]
        })
        // We set up initial tx context state to display modal
        txContext.setTxContextValue({
          operation: `Approve transfer for ${asset.__typename} ${asset.id}`,
          hash: undefined,
          status: "waiting"
        })
        // We call the Tx 
        const { hash } = await writeContract(preparedTx)
        // We update tx context with the hash + status
        txContext.setTxContextValue({
          operation: `Approve transfer for ${asset.__typename} ${asset.id}`,
          hash: hash,
          status: "loading"
        })

        // We wait for Tx to end
        const data = await waitForTransaction({hash})
        if (data.status === 'success') {
          txContext.setTxContextValue({
            operation: `Approve transfer for ${asset.__typename} ${asset.id}`,
            hash: hash,
            status: "success"
          })
          asset.approved = true
        } else {
          txContext.setTxContextValue({
            operation: `Approve transfer for ${asset.__typename} ${asset.id}`,
            hash: hash,
            status: "error"
          })
        }
      })
      // Now let's check if we have some wearables to validate
      if (approvedAssets.findIndex(asset => asset.__typename === 'wearable' && !asset.approved) >= 0) {
        // We set up initial tx context state to display modal
        txContext.setTxContextValue({
          operation: `Approve transfer for wearables`,
          hash: undefined,
          status: "waiting"
        })
        const preparedTx = await prepareWriteContract({
          address: process.env.NEXT_PUBLIC_WEARABLE_CONTRACT_ADDRESS,
          abi: wearableAbi,
          functionName: 'setApprovalForAll',
          args: [process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS, true]
        })

        
        // We call the Tx 
        const { hash } = await writeContract(preparedTx)
        // We update tx context with the hash + status
        txContext.setTxContextValue({
          operation: `Approve transfer for wearables`,
          hash: hash,
          status: "loading"
        })
        // We wait for Tx to end
        const data = await waitForTransaction({hash})
        if (data.status === 'success') {
          txContext.setTxContextValue({
            operation: `Approve transfer for wearables`,
            hash: hash,
            status: "success"
          })
          
        } else {
          txContext.setTxContextValue({
            operation: `Approve transfer for wearables`,
            hash: hash,
            status: "error"
          })
        }
      }
    }
    processTx()  
  }, [approvableAssets])
  return approvedAssets
}