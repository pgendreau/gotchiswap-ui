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
  const [approveTxStarted, setApproveTxStarted] = useState<boolean>(false)
  const cartCtx = useContext(CartContext);
  const { approvableAssets, status } = useApprovalCheck();


  // We need to check if all items are approved after each render
  // In that case we change wizard status
  if  (cartCtx.assets.length === approvableAssets.filter(asset => asset.approved).length) {
    props.setWizardState(OtcWizardStatus.CREATING)
  }

  return (
    <>
      {status === TxStatus.LOADING && (
        <div className="flex flex-row gap-x-5 justify-center">
          <Loader />
          <p>Checking approval status</p>
        </div>
      )}
      {status === TxStatus.SUCCESS && (
        <div className="flex flex-col gap-y-5 place-items-center">
          <ul>
            {approvableAssets
              .filter(
                (asset) => !asset.approved && asset.__typename !== "wearable"
              )
              .map((asset) => (
                <li className="font-kanit before:content-['G.'] before:font-gotchi before:mr-1" key={asset.id}>
                  {asset.__typename} {asset.id} needs to be approved
                </li>
              ))}
            {approvableAssets.findIndex(
              (asset) => !asset.approved && asset.__typename === "wearable"
            ) > -1 && <li className="font-kanit before:content-['V.'] before:font-gotchi before:mr-1">Wearables need to be approved</li>}
          </ul>
          { approvableAssets.findIndex(asset => !asset.approved) > -1 && !approveTxStarted && (
            <button className='btn-pink' onClick={() => {setApproveTxStarted(true)}}>
              Approuver
            </button>
          )}
          { approveTxStarted && (
            <ExecApproval approvableAssets={approvableAssets} />
          )}
        </div>
      )}
    </>
  );
};
