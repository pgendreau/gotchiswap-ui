import { aavegotchiAbi } from "@/abis/aavegotchi";
import { escrowAbi } from "@/abis/escrow";
import { TxContext } from "@/contexts/TxContext";
import {
  GotchiFieldsFragment,
  PortalFieldsFragment,
} from "@/graphql/core/__generated__/types";
import { convertAddressType } from "@/helpers/tools";
import { SelectableAsset } from "@/types/types";
import { useContext, useEffect } from "react";
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
  const txContext = useContext(TxContext);
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

  useEffect(() => {
    if (txContext && sellGotchi.data?.hash) {
      txContext?.setTxContextValue({
        hash: sellGotchi.data?.hash,
        operation: "Creating OTC offer",
        status: waitForTx.status,
      });
    }
  }, [waitForTx.status, sellGotchi.data]);

  return (
    <button
      className="bg-purple-800 hover:bg-gotchi-500 px-8"
      onClick={() => sellGotchi.write?.()}
    >
      Create Otc
    </button>
  );
};
