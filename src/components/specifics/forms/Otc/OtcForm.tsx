import { GotchiFieldsFragment } from "@/graphql/core/__generated__/types";
import {
  useAccount,
} from "wagmi";
import ClientOnly from "@/components/generics/nextShit/ClientOnly";
import { TxContext, TxContextType } from "@/contexts/TxContext";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { ModalContext } from "@/contexts/ModalContext";
import { Web3Button } from "@web3modal/react";
import { ApproveOtcButton } from "./ApproveOtcButton";
import { SelectableAsset } from "@/types/types";
import { isAddressValid } from "@/helpers/tools";

type OtcFormProps = {
  selectedAsset: SelectableAsset | null;
  setEnablePicker: Dispatch<SetStateAction<boolean>>;
}; 

type OtcFormValues = {
  price: number;
  address: string;
};

export const OtcForm = (props: OtcFormProps) => {
  const txCtx = useContext(TxContext);
  const modalCtx = useContext(ModalContext);
  const { address, isConnected } = useAccount();
  const [submitted, setSubmitted] = useState(false);
  const [targetWallet, setTargetWallet] = useState("");
  const [price, setPrice] = useState(0);

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center place-items-center gap-y-2 lg:gap-x-10 leading-8">
        <div className="flex flex-col md:flex-row justify-center gap-y-2 md:gap-x-5 w-1/3">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            disabled={submitted}
            className="text-purple-950 pl-1 w-full"
            onChange={(e) => setTargetWallet(e.target.value)}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-y-2 md:gap-x-5">
          <label htmlFor="price">Price (GHST)</label>
          <input
            id="price"
            name="price"
            type="number"
            disabled={submitted}
            className="text-purple-950 pl-1"
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
        </div>
        <ClientOnly>
        {isConnected && address ? 
           ((props.selectedAsset?.id && isAddressValid(targetWallet) && price > 0) && (
              <div>
                <ApproveOtcButton selectedAsset={props.selectedAsset} assetPrice={price} targetWallet={targetWallet} />
              </div>
            
          )) : (
            <Web3Button />
          )}
        </ClientOnly>
      </div>
    </>
  );
};