import { aavegotchiAbi } from "@/abis/aavegotchi"
import { TxContext } from "@/contexts/TxContext"
import { convertAddressType } from "@/helpers/tools"
import { useContext } from "react"
import { useContractWrite, usePrepareContractWrite } from "wagmi"
import { TxModal } from "../modals/TxModal"

type ApproveProps = { gotchiId: string }

export const Approve = (props: ApproveProps) => {
  const txContext = useContext(TxContext)

  const { config } = usePrepareContractWrite({
    address: convertAddressType(
      process.env.NEXT_PUBLIC_AAVEGOTCHI_CONTRACT_ADDRESS
    ),
    abi: aavegotchiAbi,
    functionName: "interact",
    args: [
      [props.gotchiId],
    ],
  });

  const { data,status, write } = useContractWrite(config)

  if (status != "success") {
    return <TxModal />
  }
  return <CreateOtc />    
}