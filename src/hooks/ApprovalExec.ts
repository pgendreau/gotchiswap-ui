import { aavegotchiAbi } from "@/abis/aavegotchi";
import { wearableAbi } from "@/abis/wearables";
import { CartContext } from "@/contexts/CartContext";
import { TxContext, TxContextType, txContextDefaultValue } from "@/contexts/TxContext";
import { TxStatus } from "@/helpers/enums";
import { ApprovableAsset } from "@/types/types";
import { prepareWriteContract, writeContract, waitForTransaction } from "@wagmi/core";
import { useContext, useEffect, useState } from "react";

export const useApprovalExec = (): { status: TxStatus, txContext: TxContextType } => {
  const cartCtx = useContext(CartContext);
  const [status, setStatus] = useState<TxStatus>(TxStatus.LOADING);
  const [txContext, setTxContext] = useState<TxContextType>(txContextDefaultValue)

  useEffect(() => {
    const processTx = async () => {
      console.log('exec approval async')
      // Make a fresh copy of state array
      const assetsCopy = [...cartCtx.assets]
      // Let's prepare tx then store them in the request array.
      assetsCopy.filter(asset => asset.__typename !== 'wearable' && !asset.approved).forEach(async (asset) => {
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
        setTxContext({
          operation: `Approve transfer for ${asset.__typename} ${asset.id}`,
          hash: undefined,
          status: "waiting"
        })
        // We call the Tx 
        const { hash } = await writeContract(preparedTx)
        // We update tx context with the hash + status
        setTxContext({
          operation: `Approve transfer for ${asset.__typename} ${asset.id}`,
          hash: hash,
          status: "loading"
        })

        // We wait for Tx to end
        const data = await waitForTransaction({ hash })
        if (data.status === 'success') {
          setTxContext({
            operation: `Approve transfer for ${asset.__typename} ${asset.id}`,
            hash: hash,
            status: "success"
          })
          asset.approved = true
        } else {
          setStatus(TxStatus.ERROR)
          setTxContext({
            operation: `Approve transfer for ${asset.__typename} ${asset.id}`,
            hash: hash,
            status: "error"
          })
        }
      })
      // Now let's check if we have some wearables to validate
      if (assetsCopy.findIndex(asset => asset.__typename === 'wearable' && !asset.approved) >= 0) {
        // We set up initial tx context state to display modal
        setTxContext({
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
        setTxContext({
          operation: `Approve transfer for wearables`,
          hash: hash,
          status: "loading"
        })
        // We wait for Tx to end
        const data = await waitForTransaction({ hash })
        if (data.status === 'success') {
          console.log('useApprovalExec success')
          // We flag all wearables as approved
          assetsCopy.forEach(asset => {
            if (asset.__typename === 'wearable') asset.approved = true
          })
          setTxContext({
            operation: `Approve transfer for wearables`,
            hash: hash,
            status: "success"
          })
        } else {
          setStatus(TxStatus.ERROR)
          setTxContext({
            operation: `Approve transfer for wearables`,
            hash: hash,
            status: "error"
          })
        }
      }
      if (status !== TxStatus.ERROR) {
        setStatus(TxStatus.SUCCESS)
      }

      cartCtx.setAssets(assetsCopy)
    }
    processTx()
  }, [status, setStatus, cartCtx, prepareWriteContract, writeContract, waitForTransaction])
  // }, [status, setStatus, cartCtx, txContext, prepareWriteContract, writeContract, waitForTransaction])
  return { status, txContext }
}