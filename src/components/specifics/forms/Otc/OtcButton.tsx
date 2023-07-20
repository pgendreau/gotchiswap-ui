import { aavegotchiAbi } from "@/abis/aavegotchi";
import { escrowAbi } from "@/abis/escrow";
import { GotchiFieldsFragment, PortalFieldsFragment } from "@/graphql/core/__generated__/types";
import { convertAddressType } from "@/helpers/tools";
import { useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";

type OtcButtonProps = {
  selectedAsset: GotchiFieldsFragment | PortalFieldsFragment | null;
  assetPrice: number;
  targetWallet: string;
};

export const OtcButton = (props: OtcButtonProps) => {
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
    args: [convertAddressType(process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS), props.selectedAsset?.gotchiId],
    // functionName: "interact",
    // args: [[props.selectedAsset?.gotchiId]],
    chainId: 137,
  });
  const approve = useContractWrite(prepareApproveData.config);

  const prepareSellGotchiData = usePrepareContractWrite({
    address: convertAddressType(
      process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS
    ),
    abi: escrowAbi,
    functionName: "sellGotchi",
    args: [props.selectedAsset?.gotchiId, props.assetPrice, props.targetWallet], 
    chainId: 137,
  })
  const sellGotchi = useContractWrite(prepareSellGotchiData.config);

  if (!isSuccess) {
    return <>CheckingApproval</>;
  }
  console.log(data)
  if (
    data && (data as string).toLowerCase() == convertAddressType(process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS) || approve.status == "success"
  ) {
    return (
      <button className="bg-purple-800 hover:bg-gotchi-500 px-8">
        Create Otc
      </button>
    );
  } else {
    return (
      <button className="bg-purple-800 hover:bg-gotchi-500 px-8" onClick={ () => approve.write?.()}>
        Approve OTC contract
      </button>
    );
  }
};
