import { escrowAbi } from "@/abis/escrow";
import { gotchiswapAbi } from "@/abis/gotchiswap-abi";
import { TxContext } from "@/contexts/TxContext";
import { convertAddressType, convertTxStatus } from "@/helpers/tools";
import { SaleV2, SaleWithAsset } from "@/types/types";
import { useContext, useEffect } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

export const BuyButton = (props: { sale: SaleV2 }) => {
  const txContext = useContext(TxContext);
  const prepareBuyTx = usePrepareContractWrite({
    address: convertAddressType(process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS),
    abi: gotchiswapAbi,
    functionName: "concludeSale",
    args: [props.sale.index],
  });

  const buyTx = useContractWrite(prepareBuyTx.config);

  const waitForTx = useWaitForTransaction({
    hash: buyTx.data?.hash,
  });
  
  useEffect(() => {
    if (txContext?.setTxContextValue && buyTx.data?.hash) {
      txContext?.setTxContextValue({
        hash: buyTx.data?.hash,
        operation: "Complete OTC purchase",
        status: convertTxStatus(waitForTx.status),
      });
    }
  }, [waitForTx.status, buyTx.data?.hash, txContext?.setTxContextValue]);

  return (
    <button className="btn-base" onClick={() => buyTx.write?.()}>
      LFG ! Buy It !
    </button>
  );
};
