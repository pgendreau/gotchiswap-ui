import { useState } from "react";
import { GotchiPicker } from "@/components/specifics/pickers/GotchiPicker";
import { GotchiFieldsFragment } from "@/graphql/core/__generated__/graphql";
import { OtcForm2 } from "@/components/specifics/forms/OtcForm2";

const New = () => {
  const [selectedAsset, setSelectedAsset] =
    useState<GotchiFieldsFragment | null>(null);
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
        <OtcForm2
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
    </div>
  );
};

export default New;
