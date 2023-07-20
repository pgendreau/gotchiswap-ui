import { useState } from "react";
import { GotchiPicker } from "@/components/specifics/pickers/GotchiPicker";
import {
  GotchiFieldsFragment,
  PortalFieldsFragment,
} from "@/graphql/core/__generated__/types";
import { OtcForm } from "@/components/specifics/forms/Otc/OtcForm";
import { SelectableAsset } from "@/types/types";
import { PortalPicker } from "@/components/specifics/pickers/PortalPicker";
import { WearablePicker } from "@/components/specifics/pickers/WearablePicker";

const New = () => {
  const [selectedAsset, setSelectedAsset] = useState<SelectableAsset | null>(
    null
  );
  const [enablePicker, setEnablePicker] = useState<boolean>(true);

  return (
    <div className="flex flex-col justify-center gap-y-5">
      <div className="text-2xl">
        <p>
          To create an OTC deal, just pick the asset you want to sell. Then
          enters a price (in GHST). And finally enter the address of the wallet
          you want to sold your asset to
        </p>
      </div>
      <div>
        <OtcForm
          selectedAsset={selectedAsset}
          setEnablePicker={setEnablePicker}
        />
      </div>
      <div>
        <GotchiPicker
          selectedAsset={selectedAsset}
          setSelectedAsset={setSelectedAsset}
          enablePicker={enablePicker}
        />
      </div>
      <div>
        <PortalPicker
          selectedAsset={selectedAsset}
          setSelectedAsset={setSelectedAsset}
          enablePicker={enablePicker}
        />
      </div>
      <div>
        <WearablePicker
          selectedAsset={selectedAsset}
          setSelectedAsset={setSelectedAsset}
          enablePicker={enablePicker}
        />
      </div>
    </div>
  );
};

export default New;
