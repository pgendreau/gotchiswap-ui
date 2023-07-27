import { aavegotchiAbi } from "@/abis/aavegotchi";
import { escrowAbi } from "@/abis/escrow";
import { TxContext } from "@/contexts/TxContext";
import {
  GotchiFieldsFragment,
  PortalFieldsFragment,
} from "@/graphql/core/__generated__/types";
import { convertAddressType } from "@/helpers/tools";
import { SelectableAsset } from "@/types/types";
import { useContext } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

type OtcButtonProps = {
  selectedAsset: SelectableAsset | null;
  assetPrice: number;
  targetWallet: string;
};

export const CreateOtcButton = (props: OtcButtonProps) => {
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
    // functionName: "interact",
    // args: [[props.selectedAsset?.gotchiId]],
    chainId: 137,
  });
  const approve = useContractWrite(prepareApproveData.config);

  const prepareSellGotchiData = usePrepareContractWrite({
    address: convertAddressType(process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS),
    abi: escrowAbi,
    functionName: "sellGotchi",
    args: [
      BigInt(props.selectedAsset?.id ?? ""),
      BigInt(props.assetPrice.toString() + "000000000000000000"),
      convertAddressType(props.targetWallet),
    ],
    chainId: 137,
  });

  const sellGotchi = useContractWrite(prepareSellGotchiData.config);

  const waitForTx = useWaitForTransaction({
    hash: sellGotchi.data?.hash,
  });

  // const txContext = useContext(TxContext);
  // if (txContext && sellGotchi.data?.hash) {
  //   txContext.setTxContextValue({
  //     hash: sellGotchi.data?.hash,
  //     status: waitForTx.status,
  //     operation: "Creating OTC",
  //   });
  // }

  return (
    <button
      className="bg-purple-800 hover:bg-gotchi-500 px-8"
      onClick={() => sellGotchi.write?.()}
    >
      Create Otc
    </button>
  );
};
