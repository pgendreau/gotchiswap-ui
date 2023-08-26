import { SelectableAsset } from "@/types/types";
import { GotchiCard } from "./GotchiCard";
import { PortalCard } from "./PortalCard";
import { WearableCard } from "./WearableCard";

export const BaseCard = (props: { asset: SelectableAsset}) => {
  switch (props.asset.__typename) {
    case "Aavegotchi":
      return <GotchiCard asset={props.asset} />;
    case "Portal":
      return <PortalCard asset={props.asset} />;
    case "wearable":
      return <WearableCard asset={props.asset} />;
  }
}