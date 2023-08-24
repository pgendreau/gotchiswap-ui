export enum AssetClass {
  ERC20 = 0,
  ERC1155 = 1,
  ERC721= 2
}

export enum OtcWizardStatus {
  SELECTING_ASSET = 0,
  APPROVING = 1,
  CREATING = 2,
  CREATED = 3
}

export enum TxStatus {
  IDLE = 0,
  WAITING = 4,
  LOADING = 1,
  SUCCESS = 2,
  ERROR = 3
}

export enum OfferType {
  SALE = 0,
  BUY = 1
}