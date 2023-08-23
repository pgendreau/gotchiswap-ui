import { classNames } from "@/helpers/tools";
import { Wearable } from "@/types/types";
import Image from "next/image";

type WearableCardProps = {
  wearable: Wearable;
  withBorders?: boolean | undefined;
  withBackground?: boolean | undefined;
};

export const WearableCard = ({
  wearable,
  withBorders = false,
  withBackground = false,
}: WearableCardProps) => {
  return (
    <div
      className={classNames(
        withBorders ? "p-3" : "", withBackground ? "asset" : "",
        "w-32 md:w-48 flex flex-col place-items-center place-self-start"
      )}
    >
      <div className="text-center text-sm">{wearable?.name}</div>
      <Image
        src={wearable.uri}
        width={120}
        height={120}
        alt={wearable.name}
        className="w-20 h-20 my-2"
      />
      <div className="text-center text-xs">
        {`qty: ${wearable?.qty}`}
      </div>
    </div>
  );
};
