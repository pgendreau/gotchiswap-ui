import { PleaseConnect } from "@/components/specifics/wallet/PleaseConnect";
import { useAccount } from "wagmi";

const New = () => {

  const { address, isConnected } = useAccount()
  if (!isConnected || !address) return <PleaseConnect />

  return (
    <div className="text-2xl">
      <p>To create an OTC deal, just pick the asset you want to sell</p>
      <p>Then enters a price (in GHST)</p>
      <p>
        And finally enter the address of the wallet you want to sold your asset
        to
      </p>
    </div>
  );
};

export default New;
