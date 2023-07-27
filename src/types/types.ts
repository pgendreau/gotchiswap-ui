import { GotchiFieldsFragment, PortalFieldsFragment } from "@/graphql/core/__generated__/types";
import { SvgFieldsFragment } from "@/graphql/svg/__generated__/types";
import { b } from "@wagmi/cli/dist/config-6e2b110a";
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

export type Sale = {
  id: bigint
  priceInWei: bigint
  assetId: bigint
  seller: string
  index: bigint
}

export type SaleContractResponse = [bigint, bigint, bigint, `0x${string}`]

export type SaleWithAsset = Sale & { asset: GotchiFieldsFragment | PortalFieldsFragment, svg: SvgFieldsFragment | undefined }