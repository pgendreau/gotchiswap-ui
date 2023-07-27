import { aavegotchiAbi } from "@/abis/aavegotchi";
import { escrowAbi } from "@/abis/escrow";
import { GotchiFieldsFragment, PortalFieldsFragment } from "@/graphql/core/__generated__/types";
import { convertAddressType } from "@/helpers/tools";
import { SaleWithAsset } from "@/types/types";
import { useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";

export const AbortSaleButton = (props: {sale: SaleWithAsset}) => {
  
  const prepareApproveData = usePrepareContractWrite({
    address: convertAddressType(
      process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS
    ),
    abi: escrowAbi,
    functionName: "abortGotchiSale",
    args: [props.sale.index],
    // functionName: "interact",
    // args: [[props.selectedAsset?.gotchiId]],
    chainId: 137,
  });
  const approve = useContractWrite(prepareApproveData.config);

  return (
    <button className="btn-base" onClick={ () => approve.write?.() }>
      Abort Sale
    </button>
  );
};
