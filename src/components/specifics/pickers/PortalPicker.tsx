import {
  GotchiFieldsFragmentDoc,
  usePortalsQuery,
} from "@/graphql/core/__generated__/types";
import { GET_PORTALS } from "@/graphql/core/queries/portals";
import { useGotchiSvgQuery } from "@/graphql/svg/__generated__/types";
import { classNames } from "@/helpers/tools";
import { PickerProps } from "@/types/types";
import { useQuery } from "@apollo/client/react/hooks/useQuery";
import { useAccount } from "wagmi";
import { PortalCard } from "../cards/PortalCard";

export const PortalPicker = (props: PickerProps) => {
  const address = useAccount().address?.toLowerCase() ?? "";
  const portals = usePortalsQuery({
    variables: { owner: address },
    context: { clientName: "core" },
  });

  return (
    <>
      {!!portals.data?.portals.length && (
        <div className="lg:text-4xl md:text-3xl text-2xl font-gotchi font-medium text-white p-10">
          {"X Portals X"}
        </div>
      )}

      <div className="flex flex-row flex-wrap justify-center gap-5">
        {portals.data?.portals.map((portal) => (
          <div
            id={portal.id}
            key={portal.id}
            onClick={() => props.enablePicker && props.setSelectedAsset(portal)}
            className={classNames(
              props.selectedAsset?.id === portal.id &&
                props.selectedAsset.__typename === "Portal"
                ? "bg-gotchi-500"
                : "bg-purple-800"
            )}
          >
            <PortalCard portal={portal} />
          </div>
        ))}
      </div>
    </>
  );
};
