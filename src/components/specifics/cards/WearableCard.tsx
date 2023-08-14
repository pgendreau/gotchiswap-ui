import { classNames } from "@/helpers/tools";
import { Wearable } from "@/types/types";
import Image from "next/image";

type WearableCardProps = {
  wearable: Wearable;
  withBorders?: boolean | undefined;
};

export const WearableCard = ({
  wearable,
  withBorders = false,
}: WearableCardProps) => {
  return (
    <div
      className={classNames(
        withBorders ? "p-3" : "",
        "w-48 flex flex-col place-items-center"
      )}
    >
      <div className="text-center">{wearable?.name}</div>
      <Image
        src={wearable.uri}
        width={120}
        height={120}
        alt={wearable.name}
        className="w-20 h-20 my-2"
      />
      <div className="text-center">
        {`available: ${wearable?.qty}`}
      </div>
    </div>
  );
};
