import { aavegotchiAbi } from "@/abis/aavegotchi";
import { convertAddressType } from "@/helpers/tools";
import { memo } from "react";
import { useContractRead } from "wagmi";
import { Approve } from "./Approve";
import { CreateOtc } from "./CreateOtc";

type CheckApprovalProps = { gotchiId: string };

export const CheckApproval = memo((props: CheckApprovalProps) => {
  const { data, isSuccess, status } = useContractRead({
    address: convertAddressType(
      process.env.NEXT_PUBLIC_AAVEGOTCHI_CONTRACT_ADDRESS
    ),
    abi: aavegotchiAbi,
    functionName: "getApproved",
    args: [props.gotchiId],
  });

  if (!isSuccess) {
    <>{status}</>;
  } else {
    if (
      data != convertAddressType(process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS)
    ) {
      return <Approve gotchiId={props.gotchiId} />;
    } else {
      return <CreateOtc />;
    }
  }
});
