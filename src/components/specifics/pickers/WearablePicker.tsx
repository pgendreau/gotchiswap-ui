import { wearableNames } from "@/data/wearables";
import {
  classNames,
  convertAddressType,
  getWearableUri,
} from "@/helpers/tools";
import { PickerProps, Wearable } from "@/types/types";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { wearableAbi } from "@/abis/wearables";
import { WearableCard } from "../cards/WearableCard";

export const WearablePicker = (props: PickerProps) => {
  const { address, isConnected } = useAccount();
  const [wearables, setWearables] = useState<Wearable[]>([]);
  const wearableIds = [..._.range(1, 315), ..._.range(350, 369)];
  const addressArray = Array(wearableIds.length).fill(address);
  const { data, isSuccess, status } = useContractRead({
    address: convertAddressType(
      process.env.NEXT_PUBLIC_WEARABLE_CONTRACT_ADDRESS
    ),
    abi: wearableAbi,
    functionName: "balanceOfBatch",
    args: [addressArray, wearableIds],
  });

  useEffect(() => {
    // To make sure read tx is finished and response is valid
    if (data && Array.isArray(data) && data.length === wearableIds.length) {
      // We recombine ids and qty and then remove items where qty is zero.
      const availableWearables = data
        .map((v, i) => [i + 1, parseInt(v)])
        .filter((d) => d[1])
        .map((i): Wearable => {
          return {
            id: i[0],
            name: wearableNames[i[0]],
            qty: i[1],
            uri: getWearableUri(i[0]),
            __typename: "wearable",
          };
        });
      setWearables(availableWearables);
    }
  }, [data]);

  return (
    <>
      { !!wearables.length && <div className="lg:text-4xl md:text-3xl text-2xl font-gotchi font-medium text-white p-10">
        {"V wearAbles R"}
      </div>}
      <div className="flex flex-row flex-wrap justify-center gap-5">
        {wearables.map((wearable) => (
          <div
            id={wearable.id.toString()}
            key={wearable.id}
            onClick={() =>
              props.enablePicker && props.setSelectedAsset(wearable)
            }
            className={classNames(
              props.selectedAsset?.id === wearable.id &&
                props.selectedAsset.__typename === "wearable"
                ? "bg-gotchi-500"
                : "bg-purple-800",
              "w-40 flex flex-col place-items-center"
            )}
          >
            <WearableCard wearable={wearable} />
          </div>
        ))}
      </div>
    </>
  );

  return (
    <ul>
      {wearables.map((w) => (
        <WearableCard wearable={w} />
      ))}
    </ul>
  );
};
