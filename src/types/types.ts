import { GotchiFieldsFragment, PortalFieldsFragment } from "@/graphql/core/__generated__/types";
import { SvgFieldsFragment } from "@/graphql/svg/__generated__/types";

export type SelectableAsset = Gotchi | Wearable | PortalFieldsFragment /* | GotchiFieldsFragment */
export type PickerProps = {
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

export type Gotchi = GotchiFieldsFragment & {
  svg: SvgFieldsFragment
}

export type ApprovableWearable = Wearable & { approved: boolean }
export type ApprovableGotchi = Gotchi & { approved: boolean }
export type ApprovablePortal = PortalFieldsFragment & { approved: boolean }
export type ApprovableAsset = ApprovableGotchi | ApprovableWearable | ApprovablePortal

export type SaleContractResponse = [bigint, bigint, bigint, `0x${string}`]

export type SaleWithAsset = Sale & { assets: SelectableAsset[] }


