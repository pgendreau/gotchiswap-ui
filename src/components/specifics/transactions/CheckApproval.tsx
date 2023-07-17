import { aavegotchiAbi } from "@/abis/aavegotchi";
import { TxContext, TxContextType } from "@/contexts/TxContext";
import { convertAddressType } from "@/helpers/tools";
import { PropsWithChildren, useContext } from "react";
import { useContractRead } from "wagmi";
import { TxModal } from "../modals/TxModal";

type CheckApprovalProps = { gotchiId: string;
}

export const CheckApproval = (props: CheckApprovalProps) => {
  const { data, isSuccess, status } = useContractRead({
    address: convertAddressType(process.env.NEXT_PUBLIC_AAVEGOTCHI_CONTRACT_ADDRESS),
    abi: aavegotchiAbi,
    functionName: "getApproved",
    args: [props.gotchiId],
  });

  const txContext = useContext(TxContext);
  const txContextVar: TxContextType = {
    error: null,
    status: status,
    hash: undefined,
    operationStatus: "Checking if Gotchi is approved for transfer",
  }
  if (txContext) txContext.setTxContextValue(txContextVar);

  if (!isSuccess) {
   return <TxModal />
  } else {
    if (data == convertAddressType(process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS)) {
      
    } else {

    }
  }
  

}