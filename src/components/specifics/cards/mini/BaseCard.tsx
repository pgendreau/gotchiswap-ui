import { SelectableAsset } from "@/types/types";

export const BaseCard = (props: { asset: SelectableAsset}) => {
  switch (props.asset.__typename) {
    case "Aavegotchi":
    case "Portal":
    case "wearable":
  }
}