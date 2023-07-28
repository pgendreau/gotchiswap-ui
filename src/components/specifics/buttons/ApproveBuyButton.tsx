import { ghstAbi } from "@/abis/ghst";
import { TxContext } from "@/contexts/TxContext";
import { convertAddressType } from "@/helpers/tools";
import { SaleWithAsset } from "@/types/types";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

type ApproveBuyButtonProps = {
  sale: SaleWithAsset;
  neededAllowance: bigint;
  setNeededAllowance: Dispatch<SetStateAction<bigint>>;
};

export const ApproveBuyButton = (props: ApproveBuyButtonProps) => {
  const { address, isConnected } = useAccount();
  const txContext = useContext(TxContext);
  const prepareIncreaseAllowanceTx = usePrepareContractWrite({
    address: convertAddressType(process.env.NEXT_PUBLIC_GHST_CONTRACT_ADDRESS),
    abi: ghstAbi,
    functionName: "increaseAllowance",
    args: [
      convertAddressType(process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS),
      props.neededAllowance,
    ],
  });

  const increaseAllowanceTx = useContractWrite(
    prepareIncreaseAllowanceTx.config
  );

  const waitForTx = useWaitForTransaction({
    hash: increaseAllowanceTx.data?.hash,
  });

  useEffect(() => {
    console.log("waitForTx.status", waitForTx.status);
    if (txContext?.setTxContextValue && increaseAllowanceTx.data?.hash) {
      txContext?.setTxContextValue({
        hash: increaseAllowanceTx.data?.hash,
        operation: "Increase GHST allowance",
        status: waitForTx.status,
      });
    }
    if (waitForTx.status === "success") {
      props.setNeededAllowance(BigInt(0));
    }
  }, [
    waitForTx.status,
    increaseAllowanceTx.data?.hash,
    txContext?.setTxContextValue,
    props.setNeededAllowance,
  ]);

  return (
    <button className="btn-base" onClick={() => increaseAllowanceTx.write?.()}>
      Increase allowance
    </button>
  );
};
