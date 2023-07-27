import { aavegotchiAbi } from "@/abis/aavegotchi";
import { escrowAbi } from "@/abis/escrow";
import {
  GotchiFieldsFragment,
  PortalFieldsFragment,
} from "@/graphql/core/__generated__/types";
import { convertAddressType } from "@/helpers/tools";
import { SaleWithAsset } from "@/types/types";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

export const BuyButton = (props: { sale: SaleWithAsset }) => {
  const prepareBuyTx = usePrepareContractWrite({
    address: convertAddressType(process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS),
    abi: escrowAbi,
    functionName: "buyGotchi",
    args: [props.sale.index],
  });

  const buyTx = useContractWrite(prepareBuyTx.config);

  return (
    <button className="btn-base" onClick={() => buyTx.write?.()}>
      LFG ! Buy It !
    </button>
  );
};
