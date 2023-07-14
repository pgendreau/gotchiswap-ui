export const shortenAddress = (address: `0x${string}`) => `${address.slice(0, 6)}...${address.slice(-4)}`
export const classNames = (...classes: any[]): string => classes.filter(Boolean).join(' ')