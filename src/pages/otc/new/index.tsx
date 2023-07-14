import { PleaseConnect } from "@/components/specifics/wallet/PleaseConnect";
import { useAccount } from "wagmi";
import { useState } from "react";
import { GotchiPicker } from "@/components/specifics/pickers/GotchiPicker";
import { aavegotchi } from "@/graphql/core/fragments/fragments";
import { GotchiFieldsFragment } from "@/graphql/core/__generated__/graphql";



const New = () => {
  const { address, isConnected } = useAccount();
  const [selectedAsset, setSelectedAsset] = useState<GotchiFieldsFragment | null>(null);


  if (!isConnected || !address) return <PleaseConnect />;
  
  return (
    <div className="flex flex-col justify-center gap-y-5">
      <div className="text-2xl">
        <p>To create an OTC deal, just pick the asset you want to sell</p>
        <p>Then enters a price (in GHST)</p>
        <p>
          And finally enter the address of the wallet you want to sold your
          asset to
        </p>
      </div>
      <div>
        <GotchiPicker
          selectedAsset={selectedAsset}
          setSelectedAsset={setSelectedAsset}
        />
      </div>
    </div>
  );
};

export default New;
