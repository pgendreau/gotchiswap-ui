import { GotchiFieldsFragment, PortalFieldsFragment } from "@/graphql/core/__generated__/types";
import { Dispatch, SetStateAction } from "react";

export type SelectableAsset = GotchiFieldsFragment | Wearable | PortalFieldsFragment

export type PickerProps = {
  selectedAsset: SelectableAsset | null;
  setSelectedAsset: Dispatch<SetStateAction<SelectableAsset | null>>;
  enablePicker: boolean; 
};

export type Wearable = {
  id: number
  name: string
  qty: number,
  uri: string
  __typename: "wearable"
}