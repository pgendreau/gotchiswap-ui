import { SelectableAsset, Wearable } from "@/types/types"

export const shortenAddress = (address: string | undefined) => address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""

export const classNames = (...classes: any[]): string => classes.filter(Boolean).join(' ')

export const convertAddressType = (address: string | undefined): `0x${string}` => {
    if (!address) return '0x0'
    if (address.startsWith('0x')) address = address.slice(2, address.length)
    return `0x${address.toLowerCase()}`
}

export const getWearableUri = (id: number): string => {
  return `https://app.aavegotchi.com/images/items/${id}.svg`
}

export const readablePrice = (price: bigint | undefined): string => {
  return price ? `${price / BigInt(10 ** 18)}` : ""
}

export const isAddressValid = (address: string): boolean => {
  return address.length === 42 && address.startsWith('0x')
}

export const isWearable = (asset: SelectableAsset): asset is Wearable => {
  return (asset.__typename === 'wearable')
  // return (asset as Wearable)?.__typename === 'wearable'
}