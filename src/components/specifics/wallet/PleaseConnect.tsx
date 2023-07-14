import { ConnectKitButton } from "connectkit"

export const PleaseConnect = () => {
    return (
        <div className="text-2xl flex flex-col justify-center place-items-center gap-y-10">
            <p>To create an OTC deal, please first connect your wallet</p>
            <ConnectKitButton />
        </div>
    )
}