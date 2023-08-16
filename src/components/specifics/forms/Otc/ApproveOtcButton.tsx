import { aavegotchiAbi } from "@/abis/aavegotchi";
import { convertAddressType } from "@/helpers/tools";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { CreateOtcButton } from "./CreateOtcButton";
import { SelectableAsset } from "@/types/types";
import { useContext, useEffect } from "react";
import { TxContext, TxContextType } from "@/contexts/TxContext";
import { CartContext } from "@/contexts/CartContext";

type OtcButtonProps = {
  selectedAsset: SelectableAsset | null;
  assetPrice: number;
  targetWallet: string;
};

export const ApproveOtcButton = (props: OtcButtonProps) => {
  const txContext = useContext(TxContext);
  const cartCtx = useContext(CartContext);

  const { data, isSuccess, status } = useContractRead({
    address: convertAddressType(
      process.env.NEXT_PUBLIC_AAVEGOTCHI_CONTRACT_ADDRESS
    ),
    abi: aavegotchiAbi,
    functionName: "getApproved",
    args: [props.selectedAsset?.id],
  });

  const prepareApproveData = usePrepareContractWrite({
    address: convertAddressType(
      process.env.NEXT_PUBLIC_AAVEGOTCHI_CONTRACT_ADDRESS
    ),
    abi: aavegotchiAbi,
    functionName: "approve",
    args: [
      convertAddressType(process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS),
      props.selectedAsset?.id,
    ],
    chainId: 137,
  });
  const approve = useContractWrite(prepareApproveData.config);

  const waitForTx = useWaitForTransaction({
    hash: approve.data?.hash,
  });

  useEffect(() => {
    console.log("waitForTx.status", waitForTx.status);
    if (txContext?.setTxContextValue && approve.data?.hash) {
      txContext?.setTxContextValue({
        hash: approve.data?.hash,
        operation: "Approving OTC contract",
        status: waitForTx.status,
      });
    }
  }, [waitForTx.status, approve.data?.hash, txContext?.setTxContextValue]);

  if (!isSuccess) {
    return <>CheckingApproval</>;
  }

  if (
    (data &&
      (data as string).toLowerCase() ==
        convertAddressType(process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS)) ||
    waitForTx.status == "success"
  ) {
    return (
      <CreateOtcButton
        selectedAsset={props.selectedAsset}
        assetPrice={props.assetPrice}
        targetWallet={props.targetWallet}
      />
    );
  } else {
    return (
      <>
        <button
          className="bg-purple-800 hover:bg-gotchi-500 px-8"
          onClick={() => {
            approve.write?.();
          }}
        >
          Approve OTC contract
        </button>
      </>
    );
  }
};
