export const shortenAddress = (address: `0x${string}`) => `${address.slice(0, 6)}...${address.slice(-4)}`

export const classNames = (...classes: any[]): string => classes.filter(Boolean).join(' ')

export const convertAddressType = (address: string | undefined): `0x${string}` => {
    if (!address) return '0x0'
    return `0x${address.toLowerCase()}`
}
export const getWearableUri = (id: number): string => {
  return `https://app.aavegotchi.com/images/items/${id}.svg`
}