import { shortenAddress } from "@/helpers/tools";
import { useAccount, useEnsName, useDisconnect } from "wagmi";

export const Connected = () => {
  const { address, isConnected } = useAccount();
  //const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();

  return (
    !!address && (
      <div className="bg-white text-purple-950 text-sm px-5 py-2 rounded-xl flex md:flex-col md:gap-y-1 flex-row gap-x-2 justify-center place-items-center">
        <div>{shortenAddress(address)}</div>
        <div>
          <button className='hover:text-gotchi-500' onClick={() => disconnect()}>Disconnect</button>
        </div>
      </div>
    )
  );
};
