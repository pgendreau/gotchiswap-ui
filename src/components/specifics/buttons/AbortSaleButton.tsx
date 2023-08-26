import { gotchiswapAbi } from "@/abis/gotchiswap-abi";
import { TxStatus } from "@/helpers/enums";
import { convertAddressType, createTxContext } from "@/helpers/tools";
import { SaleV2, TxContextType } from "@/types/types";
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
  
  if (txWaitData.isSuccess) {
    router.reload();
  }

  const txContext = createTxContext(
    "Abort OTC Sale",
    txWriteData.status,
    txWaitData.status,
    txWriteData.data?.hash,
    txWriteData.error,
    txWaitData.error
  )

  return (
    <>
      <button className="btn-base" onClick={() => txWriteData.write?.()}>
        Abort Sale
      </button>
      <TxModal txContext={txContext} />
    </>
  );
};
