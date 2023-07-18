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

type GotchiPickerProps = {
  selectedAsset: GotchiFieldsFragment | null;
  setSelectedAsset: Dispatch<SetStateAction<GotchiFieldsFragment | null>>;
  enablePicker: boolean; 
};

export const GotchiPicker = (props: GotchiPickerProps) => {
  const address = useAccount().address?.toLowerCase() ?? "";
  const gotchis = useGotchisQuery({
    variables: { owner: address },
    context: { clientName: "core" },
  });

  const ids = gotchis.data?.aavegotchis?.map((gotchi) => gotchi?.id);
  const svgs = useGotchisSvgQuery({
    variables: { ids: ids },
    context: { clientName: "svg" },
  });

  return (
    <div className="flex flex-row flex-wrap justify-center gap-5">
      {gotchis.data?.aavegotchis.map((gotchi) => (
        <div
          id={gotchi.id}
          key={gotchi.id}
          onClick={() =>
            props.enablePicker && props.setSelectedAsset(gotchi)
          }
          className={classNames(
            props.selectedAsset?.id === gotchi.id
              ? "bg-gotchi-500"
              : "bg-purple-800"
          )}
        >
          <GotchiCard gotchi={gotchi} svg={svgs.data?.aavegotchis?.find((svg) => svg?.id === gotchi?.id)} />
        </div>
      ))}
    </div>
  );
};
