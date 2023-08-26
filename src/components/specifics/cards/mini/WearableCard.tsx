import { Wearable } from "@/types/types";
import Image from "next/image";

export const WearableCard = (props: { asset: Wearable }) => {
  return (
    <>
      <div className="text-center text-xs">{props.asset.name}</div>
      <Image
        src={props.asset.uri}
        width={60}
        height={60}
        alt={props.asset.name}
        className='object-contain object-center w-20 h-20 p-2'
      />
      <div className="text-center">{`x ${props.asset?.qty}`}</div>
    </>
  );
};
