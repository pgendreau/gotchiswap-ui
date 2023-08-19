import { OtcWizardStatus, TxStatus } from "@/helpers/enums";
import { SelectableAsset } from "@/types/types";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useApprovalCheck } from "@/hooks/ApprovalCheck";
import { CartContext } from "@/contexts/CartContext";
import { Loader } from "@/components/generics/loaders/Loader";
import { ExecApproval } from "./ExecApproval";

type CheckApprovalProps = {
  wizardState: OtcWizardStatus;
  setWizardState: Dispatch<SetStateAction<OtcWizardStatus>>;
};

export const CheckApproval = (props: CheckApprovalProps) => {
  const cartCtx = useContext(CartContext);
  const { status } = useApprovalCheck();


  // We need to check if all items are approved after each render
  // In that case we change wizard status
  // if  (cartCtx.assets.findIndex(asset => !asset.approved) === -1) {
  //   props.setWizardState(OtcWizardStatus.CREATING)
  // }

  return (
    <>
      {status === TxStatus.LOADING && (
        <div className="flex flex-row gap-x-5 justify-center">
          <Loader />
          <p>Checking approval status</p>
        </div>
      )}
    </>
  );
};
