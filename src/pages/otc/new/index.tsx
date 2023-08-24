import { useContext, useState } from "react";
import { GotchiPicker } from "@/components/specifics/pickers/GotchiPicker";
import { PortalPicker } from "@/components/specifics/pickers/PortalPicker";
import { WearablePicker } from "@/components/specifics/pickers/WearablePicker";
import { CartContext, CartContextProvider } from "@/contexts/CartContext";
import { OtcCart } from "@/components/specifics/cart/OtcCart";
import { OtcWizardStatus } from "@/helpers/enums";
import { CheckApproval } from "@/components/specifics/pages/otc/new/CheckApproval";
import { ExecApproval } from "@/components/specifics/pages/otc/new/ExecApproval";
import { CreateOtc } from "@/components/specifics/pages/otc/new/CreateOtc";
import {
  OtcWizardContext,
  OtcWizardContextProvider,
} from "@/contexts/WizardContext";

const NewContent = () => {
  const [enablePicker, setEnablePicker] = useState<boolean>(true);
  // const [wizardState, setWizardState] = useState<OtcWizardStatus>(
  //   OtcWizardStatus.SELECTING_ASSET
  // );

  const wizardCtx = useContext(OtcWizardContext);

  const cartCtx = useContext(CartContext);
  console.log("render index");

  return (
    <div className="flex flex-col justify-center gap-y-10">
      {/* <div className="text-2xl">
        <p>
          To create an OTC deal, just pick the asset you want to sell. Then
          clicks on the Next button to proceed.
        </p>
      </div> */}
      <OtcCart />
      {wizardCtx.status === OtcWizardStatus.APPROVING &&
        cartCtx.assets.findIndex(
          (asset) => typeof asset.approved === "undefined"
        ) > -1 && <CheckApproval />}
      {wizardCtx.status === OtcWizardStatus.APPROVING &&
        cartCtx.assets.findIndex(
          (asset) => typeof asset.approved === "boolean" && !asset.approved
        ) > -1 && <ExecApproval />}
      {wizardCtx.status === OtcWizardStatus.APPROVING &&
        cartCtx.assets.findIndex(
          (asset) => typeof asset.approved === "undefined" || !asset.approved
        ) === -1 && <CreateOtc />}
      {wizardCtx.status === OtcWizardStatus.SELECTING_ASSET && (
        <>
          <div>
            <GotchiPicker enablePicker={enablePicker} />
          </div>
          <div>
            <PortalPicker enablePicker={enablePicker} />
          </div>
          <div>
            <WearablePicker enablePicker={enablePicker} />
          </div>
        </>
      )}
    </div>
  );
};

const New = () => {
  return (
    // <CartContextProvider>
    <OtcWizardContextProvider>
      <NewContent />
    </OtcWizardContextProvider>
    // </CartContextProvider>
  );
};

export default New;
