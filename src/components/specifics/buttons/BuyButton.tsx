import { aavegotchiAbi } from "@/abis/aavegotchi";
import { escrowAbi } from "@/abis/escrow";
import { TxContext } from "@/contexts/TxContext";
import {
  GotchiFieldsFragment,
  PortalFieldsFragment,
} from "@/graphql/core/__generated__/types";
import { convertAddressType } from "@/helpers/tools";
import { SaleWithAsset } from "@/types/types";
import { useContext, useEffect } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

export const BuyButton = (props: { sale: SaleWithAsset }) => {
  const txContext = useContext(TxContext);
  const prepareBuyTx = usePrepareContractWrite({
    address: convertAddressType(process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS),
    abi: escrowAbi,
    functionName: "buyGotchi",
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
        status: waitForTx.status,
      });
    }
  }, [waitForTx.status, buyTx.data?.hash, txContext?.setTxContextValue]);

  return (
    <button className="btn-base" onClick={() => buyTx.write?.()}>
      LFG ! Buy It !
    </button>
  );
};
