import {
  GotchiFieldsFragment,
  GotchiQueryResult,
  useGotchisQuery,
} from "@/graphql/core/__generated__/types";
import { useGotchisSvgQuery } from "@/graphql/svg/__generated__/types";
import { classNames } from "@/helpers/tools";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useAccount } from "wagmi";
import { GotchiCard } from "../cards/GotchiCard";
import { SelectableAsset } from "@/types/types";

type GotchiPickerProps = {
  selectedAsset: SelectableAsset[];
  setSelectedAsset: Dispatch<SetStateAction<SelectableAsset[]>>;
  enablePicker: boolean;
};

export const GotchiPicker = (props: GotchiPickerProps) => {
  const address = useAccount().address?.toLowerCase() ?? "";
  const gotchis = useGotchisQuery({
    variables: { owner: address },
    context: { clientName: "core" },
    pollInterval: 6000,
  });
  gotchis.refetch();
  const ids = gotchis.data?.aavegotchis?.map((gotchi) => gotchi?.id);
  const svgs = useGotchisSvgQuery({
    variables: { ids: ids },
    context: { clientName: "svg" },
    pollInterval: 6000,
  });

  const handlePickerClick = (gotchi: GotchiFieldsFragment) => {
    if (props.enablePicker) {
      // If the asset is already in the array we will remove it
      // Otherwise we will add it
      if (props.selectedAsset.find((asset) => asset.id === gotchi.id)) {
        props.setSelectedAsset(
          props.selectedAsset.filter((asset) => asset.id !== gotchi.id)
        );
      } else {
        const newArray = [ ...props.selectedAsset ]
        newArray.push(gotchi);
        props.setSelectedAsset(newArray);
      }
    }
  };

  return (
    <>
      {!!gotchis.data?.aavegotchis.length && (
        <div className="lg:text-4xl md:text-3xl text-2xl font-gotchi font-medium text-white p-10">
          {"G gotchis G"}
        </div>
      )}
      <div className="flex flex-row flex-wrap justify-center gap-5">
        {gotchis.data?.aavegotchis.map((gotchi) => (
          <div
            id={gotchi.id}
            key={gotchi.id}
            onClick={ () => handlePickerClick(gotchi)}
            className={classNames(
              props.selectedAsset.find(asset => asset?.id === gotchi.id)
                ? "bg-gotchi-500"
                : "bg-purple-800"
            )}
          >
            <GotchiCard
              gotchi={gotchi}
              svg={svgs.data?.aavegotchis?.find(
                (svg) => svg?.id === gotchi?.id
              )}
              withBorders
            />
          </div>
        ))}
      </div>
    </>
  );
};
