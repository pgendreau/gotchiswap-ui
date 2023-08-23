import { SelectableAsset, Wearable } from "@/types/types"
import { TxStatus } from "./enums"

/**
 * @description Basic address shortener
 * @param address 
 * @returns string
 */
export const shortenAddress = (address: string | undefined) => address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""

/**
 * @description Basic classnames helper to inject logic in className props
 * @param classes
 * @returns string
 */
export const classNames = (...classes: any[]): string => classes.filter(Boolean).join(' ')

/**
 * @description Because Viem / Wagmi relies on typed 0xString for addresses we need to conert any pure string address to 0xString
 * @param address 
 * @returns `0x${string}`
 */
export const convertAddressType = (address: string | undefined): `0x${string}` => {
    if (!address) return '0x0'
    if (address.startsWith('0x')) address = address.slice(2, address.length)
    return `0x${address.toLowerCase()}`
}

/**
 * @description kind of a typequard for 0xString
 * @param address 
 * @returns boolean
 */
export const isAddressValid = (address: string): boolean => {
  return address.length === 42 && address.startsWith('0x')
}


/**
 * @description Helper to get the uri of a wearable based on wearable id
 * @param id 
 * @returns string
 */
export const getWearableUri = (id: number): string => {
  return `https://app.aavegotchi.com/images/items/${id}.svg`
}

/**
 * @description Convert wei into eth
 * @param price 
 * @returns string
 */
export const readablePrice = (price: bigint | undefined): string => {
  return price ? `${price / BigInt(10 ** 18)}` : ""
}

/**
 * @description Wearable type guard
 * @param asset
 * @returns boolean
 */
export const isWearable = (asset: SelectableAsset): asset is Wearable => {
  return (asset.__typename === 'wearable')
}

/**
 * basic delay helper
 * @param ms 
 * @returns Promise 
 */
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const convertTxStatus = (status: string): TxStatus => {
  switch (status) {
    case 'success':
      return TxStatus.SUCCESS
    case 'error':
      return TxStatus.ERROR
    case 'waiting':
      return TxStatus.WAITING
    case 'loading':
      return TxStatus.LOADING
    default:
      return TxStatus.IDLE
  }
}