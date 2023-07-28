import { escrowAbi } from "@/abis/escrow";
import { TxContext } from "@/contexts/TxContext";
import { convertAddressType } from "@/helpers/tools";
import { SaleWithAsset } from "@/types/types";
import { useContext, useEffect } from "react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

export const AbortSaleButton = (props: {sale: SaleWithAsset}) => {
  const txContext = useContext(TxContext);

  const abortTxData = usePrepareContractWrite({
    address: convertAddressType(
      process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS
    ),
    abi: escrowAbi,
    functionName: "abortGotchiSale",
    args: [props.sale.index],
    chainId: 137,
  });
  
  const abortTx = useContractWrite(abortTxData.config);

  const waitForTx = useWaitForTransaction({
    hash: abortTx.data?.hash,
  });

  useEffect(() => {
    console.log("waitForTx.status", waitForTx.status);
    if (txContext?.setTxContextValue && abortTx.data?.hash) {
      txContext?.setTxContextValue({
        hash: abortTx.data?.hash,
        operation: "Aborting OTC offer",
        status: waitForTx.status,
      });
    }
  }, [waitForTx.status, abortTx.data?.hash, txContext?.setTxContextValue]);

  return (
    <button className="btn-base" onClick={ () => abortTx.write?.() }>
      Abort Sale
    </button>
  );
};
