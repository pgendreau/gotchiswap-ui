import { SectionTitle } from "@/components/generics/section/SectionTitle";
import { CartContext } from "@/contexts/CartContext";
import { Dispatch, SetStateAction, useContext } from "react";
import { BaseCard } from "../cards/mini/BaseCard";
import { CardLayout } from "../cards/mini/CardLayout";
import { SelectableAsset } from "@/types/types";
import { OtcWizardStatus } from "@/helpers/enums";
import { Loader } from "@/components/generics/loaders/Loader";
import { OtcWizardContext } from "@/contexts/WizardContext";

const countCartItems = (cart: SelectableAsset[]): number => {
  const count = cart.reduce((acc, curr) => {
    if (curr.__typename === "wearable") {
      return acc + curr.qty;
    }
    return acc + 1;
  }, 0);
  return count;
};

const displayCartCount = (cart: SelectableAsset[]): string => {
  const count = countCartItems(cart);
  if (count === 0) {
    return "";
  }
  return `(${count})`;
};

export const OtcCart = () => {
  const cartCtx = useContext(CartContext);
  const wizardCtx = useContext(OtcWizardContext);

  return (
    <div>
      <SectionTitle>
        your selection Y {displayCartCount(cartCtx.assets)}
      </SectionTitle>
      {!cartCtx.assets.length ? (
        <div className="text-2xl">
          <p>You haven't selected any assets yet</p>
        </div>
      ) : (
        <div className="flex flex-row flex-wrap justify-center gap-5">
          {cartCtx.assets.map((asset) => (
            <CardLayout key={asset.id}>
              <BaseCard asset={asset} />
            </CardLayout>
          ))}
          {!!(
            cartCtx.assets.length > 0 &&
            wizardCtx.status === OtcWizardStatus.SELECTING_ASSET
          ) && (
            <button
              className="btn-pink object-cover w-20"
              onClick={() => wizardCtx.setStatus(OtcWizardStatus.APPROVING)}
            >
              Next
            </button>
          )}
          {wizardCtx.status !== OtcWizardStatus.SELECTING_ASSET && (
            <button
              className="btn-pink object-cover w-20"
              onClick={() => {
                if (wizardCtx.status === OtcWizardStatus.APPROVING) {
                  wizardCtx.setStatus(OtcWizardStatus.SELECTING_ASSET);
                } else if (wizardCtx.status === OtcWizardStatus.CREATING) {
                  wizardCtx.setStatus(OtcWizardStatus.APPROVING);
                }
              }}
            >
              Back
            </button>
          )}
        </div>
      )}
    </div>
  );
};
