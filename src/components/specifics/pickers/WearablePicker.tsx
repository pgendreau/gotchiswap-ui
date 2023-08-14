import { wearableNames } from "@/data/wearables";
import {
  classNames,
  convertAddressType,
  getWearableUri,
  isWearable,
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
  const originalWearables: Wearable[] = [];
  const { data, isSuccess, isError, status } = useContractRead({
    address: convertAddressType(
      process.env.NEXT_PUBLIC_WEARABLE_CONTRACT_ADDRESS
    ),
    abi: wearableAbi,
    functionName: "balanceOfBatch",
    args: [addressArray, wearableIds],
    onSuccess(data) {
      if (data && Array.isArray(data) && data.length === wearableIds.length) {
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
        availableWearables.forEach((wearable) => {
          originalWearables[wearable.id] = wearable;
        });
      }
    },
  });

  const handlePlusClick = (item: Wearable) => {
    // First we check that picker is enabled and the item we want to add to the selected items has available quantity
    if (props.enablePicker && item.qty > 0) {
      // We need to duplicate the state array to avoid mutating it
      const assetsCopy = [...props.selectedAsset];
      // If the asset is already in the array we will have to check quantity
      const assetIndex = assetsCopy.findIndex(
        (asset) => asset.id === item.id && asset.__typename === "wearable"
      );
      // isDone flag to validate the plus action is really done.
      let isDone = false;
      if (assetIndex >= 0 && isWearable(assetsCopy[assetIndex])) {
        // If the asset is already in the array we will have to add +1 to the quantity in the state array
        const asset = assetsCopy[assetIndex];
        if (isWearable(asset)) {
          asset.qty += 1;
          assetsCopy[assetIndex] = asset;
          props.setSelectedAsset(assetsCopy);
          isDone = true;
        }
      } else {
        // If the asset is not in the array we will add it with qty = 1
        const asset = { ...item };
        asset.qty = 1;
        assetsCopy.push(asset);
        props.setSelectedAsset(assetsCopy);
        isDone = true;
      }
      if (isDone) {
        // When done adding, we need to remove 1 from the item quantity in the available wearables state array
        const wearablesCopy = [...wearables];
        const wearableIndex = wearablesCopy.findIndex(
          (wearable) => wearable.id === item.id
        );
        if (wearableIndex >= 0) {
          wearablesCopy[wearableIndex].qty -= 1;
          setWearables(wearablesCopy);
        }
      }
    }
  };

  const handleMinusClick = (item: Wearable) => {
    if (props.enablePicker) {
      // We need to duplicate the state array to avoid mutating it
      const assetsCopy = [...props.selectedAsset];
      // We check if the asset is in the array, should be always there
      const assetIndex = assetsCopy.findIndex(
        (asset) => asset.id === item.id && asset.__typename === "wearable"
      );
      if (assetIndex >= 0) {
        const item = assetsCopy[assetIndex];
        // Typescript forces us to use a type quard, otherweise we can't manipulate qty property properly
        if (isWearable(item)) {
          item.qty -= 1;
          // If quantity goes to 0 we remove the asset from the selected asset array.
          if (item.qty === 0) {
            assetsCopy.splice(assetIndex, 1);
          } else {
            assetsCopy[assetIndex] = item;
          }
          // We update the selected asset array state
          props.setSelectedAsset(assetsCopy);
        }
      }
      // When done removing, we need to add 1 from the item quantity in the available wearables state array
      const wearablesCopy = [...wearables];
      const wearableIndex = wearablesCopy.findIndex(
        (wearable) => wearable.id === item.id
      );
      if (wearableIndex >= 0) {
        wearablesCopy[wearableIndex].qty += 1;
        setWearables(wearablesCopy);
      }
    }
  };

  return (
    <>
      {!!wearables.length && (
        <div className="lg:text-4xl md:text-3xl text-2xl font-gotchi font-medium text-white p-10">
          {"V wearAbles R"}
        </div>
      )}
      <div className="flex flex-row flex-wrap justify-center gap-5">
        {wearables.map((wearable) => (
          <div
            id={wearable.id.toString()}
            key={wearable.id}
            className={classNames(
              props.selectedAsset.findIndex(
                (asset) =>
                  asset.id === wearable.id && asset.__typename === "wearable"
              ) >= 0
                ? "bg-gotchi-500"
                : "bg-purple-800",
              "w-40 flex flex-col place-items-center"
            )}
          >
            <WearableCard wearable={wearable} />
            <div className="flex flex-row justify-center gap-2">
              {props.selectedAsset.findIndex(
                (asset) =>
                  asset.id === wearable.id && asset.__typename === "wearable"
              ) >= 0 && (
                <button onClick={() => handleMinusClick(wearable)}>-</button>
              )}
              {wearable.qty > 0 && (
                <button onClick={() => handlePlusClick(wearable)}>+</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return <></>;
};
