import { aavegotchiAbi } from "@/abis/aavegotchi";
import { TxContext } from "@/contexts/TxContext";
import { convertAddressType } from "@/helpers/tools";
import { memo, useCallback, useContext, useEffect } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { TxModal } from "../modals/TxModal";

type ApproveProps = { gotchiId: string };

export const Approve = memo((props: ApproveProps) => {
  const { config } = usePrepareContractWrite({
    address: convertAddressType(
      process.env.NEXT_PUBLIC_AAVEGOTCHI_CONTRACT_ADDRESS
    ),
    abi: aavegotchiAbi,
    functionName: "interact",
    args: [[props.gotchiId]],
    chainId: 137,
  });

  console.log("Approve");

  const { data, status, write } = useContractWrite(config);

  console.log("Approve renders");

  return <>{status}</>;
});
