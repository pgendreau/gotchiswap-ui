import { ghstAbi } from "@/abis/ghst";
import { convertAddressType } from "@/helpers/tools";
import { SaleWithAsset } from "@/types/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { BuyButton } from "./BuyButton";
import { data } from "autoprefixer";
import { write } from "fs";

type ApproveBuyButtonProps = {
  sale: SaleWithAsset;
  neededAllowance: bigint;
  setNeededAllowance: Dispatch<SetStateAction<bigint>>;
}

export const ApproveBuyButton = (props: ApproveBuyButtonProps) => {
  const { address, isConnected } = useAccount();

  const prepareIncreaseAllowanceTx = usePrepareContractWrite({
    address: convertAddressType(process.env.NEXT_PUBLIC_GHST_CONTRACT_ADDRESS),
    abi: ghstAbi,
    functionName: "increaseAllowance",
    args: [ convertAddressType(process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS), props.neededAllowance],
  });

  const increaseAllowanceTx = useContractWrite(prepareIncreaseAllowanceTx.config);
  
  if (increaseAllowanceTx.status === "success") {
    props.setNeededAllowance(BigInt(0));
  }

  return (
    <button
      className="btn-base"
      onClick={() => increaseAllowanceTx.write?.()}
    >
      Increase allowance
    </button>
  );
};
