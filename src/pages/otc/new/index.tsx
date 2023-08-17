import { useState } from "react";
import { GotchiPicker } from "@/components/specifics/pickers/GotchiPicker";
import { OtcForm } from "@/components/specifics/forms/Otc/OtcForm";
import { SelectableAsset } from "@/types/types";
import { PortalPicker } from "@/components/specifics/pickers/PortalPicker";
import { WearablePicker } from "@/components/specifics/pickers/WearablePicker";
import { CartContext, CartContextProvider } from "@/contexts/CartContext";
import { OtcCart } from "@/components/specifics/cart/OtcCart";

const New = () => {
  const [selectedAsset, setSelectedAsset] = useState<SelectableAsset[]>([]);
  const [enablePicker, setEnablePicker] = useState<boolean>(true);

  return (
    <CartContextProvider>
      <div className="flex flex-col justify-center gap-y-10">
        <div className="text-2xl">
          <p>
            To create an OTC deal, just pick the asset you want to sell. Then
            clicks on the Next button to proceed.
          </p>
        </div>
        <OtcCart />
        {/* <div>
          <OtcForm
            selectedAsset={selectedAsset}
            setEnablePicker={setEnablePicker}
          />
        </div> */}
        <div>
          <GotchiPicker
            enablePicker={enablePicker}
          />
        </div>
        <div>
          <PortalPicker
            enablePicker={enablePicker}
          />
        </div>
        <div>
          <WearablePicker
            enablePicker={enablePicker}
          />
        </div>
      </div>
    </CartContextProvider>
  );
};

export default New;
