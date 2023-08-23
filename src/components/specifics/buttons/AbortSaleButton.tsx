import { escrowAbi } from "@/abis/escrow";
import { gotchiswapAbi } from "@/abis/gotchiswap-abi";
import { TxContext } from "@/contexts/TxContext";
import { TxStatus } from "@/helpers/enums";
import { convertAddressType, convertTxStatus } from "@/helpers/tools";
import { SaleV2, SaleWithAsset, TxContextType } from "@/types/types";
import { useContext, useEffect } from "react";
import { BaseError } from "viem";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { TxModal } from "../modals/tx/TxModal";
import { useRouter } from "next/router";

export const AbortSaleButton = (props: { sale: SaleV2 }) => {
  const router = useRouter();
  const abortTxData = usePrepareContractWrite({
    address: convertAddressType(process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS),
    abi: gotchiswapAbi,
    functionName: "abortSale",
    args: [props.sale.index],
    chainId: 137,
  });

  const txWriteData = useContractWrite(abortTxData.config);

  const txWaitData = useWaitForTransaction({
    hash: txWriteData.data?.hash,
  });

  let txContext: TxContextType = {
    operation: "Abort OTC offer",
    hash: "0x0",
    status: TxStatus.IDLE,
  };

  if (txWriteData.status === "loading" && txWaitData.status === "idle") {
    txContext = {
      operation: "Abort OTC offer",
      hash: "0x0",
      status: TxStatus.WAITING,
    };
  }

  if (txWriteData.isError || txWaitData.isError) {
    let errorMessage = "An error has occured. Please try again.";
    if (txWriteData.error instanceof BaseError) {
      errorMessage = txWriteData.error.shortMessage;
    } else if (txWaitData.error instanceof BaseError) {
      errorMessage = txWaitData.error.shortMessage;

      txContext = {
        operation: errorMessage,
        hash: txWriteData.data?.hash,
        status: TxStatus.ERROR,
      };
    }
  }

  if (txWriteData.isSuccess && txWaitData.isLoading) {
    txContext = {
      operation: "Create OTC offer",
      hash: txWriteData.data?.hash,
      status: TxStatus.LOADING,
    };
  }

  if (txWaitData.isSuccess) {
    router.reload();
  }

  return (
    <>
      <button className="btn-base" onClick={() => txWriteData.write?.()}>
        Abort Sale
      </button>
      <TxModal txContext={txContext} />
    </>
  );
};
