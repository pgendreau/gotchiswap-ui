import { Wearable } from "@/types/types";
import Image from "next/image";

export const WearableCard = (props: { wearable: Wearable }) => {
  return (
    <>
      <div className="font-kanit text-sm text-center">
        {props.wearable?.name}
      </div>
      <Image
        src={props.wearable.uri}
        width={120}
        height={120}
        alt={props.wearable.name}
        className="w-20 h-20"
      />
      <div className="font-kanit text-sm text-center">
        {`qty: ${props.wearable?.qty}`}
      </div>
    </>
  );
};
