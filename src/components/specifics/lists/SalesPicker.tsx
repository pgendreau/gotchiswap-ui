import {
  GotchiFieldsFragment,
  PortalFieldsFragment,
  PortalStatus,
  useGotchisByIdQuery,
  usePortalsByIdQuery,
} from "@/graphql/core/__generated__/types";
import { useGotchisSvgQuery } from "@/graphql/svg/__generated__/types";
import { Sale, SaleWithAsset } from "@/types/types";
import { useEffect, useState } from "react";
import { GotchiCard } from "../cards/GotchiCard";
import { SaleCard } from "../cards/SaleCard";
import { PortalCard } from "../cards/PortalCard";

export const SalesPicker = (props: { sales: Sale[] }) => {
  const [selected, setSelected] = useState<bigint>(BigInt(0));
  const [salesWithAsset, setSalesWithAsset] = useState<SaleWithAsset[]>();

  const ids = props.sales.map((sale) => sale.assetId.toString());
  const portals = usePortalsByIdQuery({
    variables: { ids: ids },
    context: { clientName: "core" },
    skip: !ids.length,
  });

  const gotchiIds = portals.data?.portals
    .filter((portal) => portal.status === PortalStatus.Claimed)
    .map((portal) => portal.id);

  const gotchis = useGotchisByIdQuery({
    variables: { ids: gotchiIds },
    context: { clientName: "core" },
    skip: !gotchiIds?.length,
  });

  const svgs = useGotchisSvgQuery({
    variables: { ids: ids },
    context: { clientName: "svg" },
    skip: !gotchiIds?.length,
  });

  useEffect(() => {
    // Big stop in  case we don't have the data yet
    // Not nice but effective
    if (! gotchis || gotchis.loading || !portals || portals.loading || !svgs || svgs.loading) {
      return
    }
    const data: SaleWithAsset[] = props.sales
      .map((sale) => {
        let asset: GotchiFieldsFragment | PortalFieldsFragment | undefined;
        // Asset is   always in portals so we start there
        asset = portals.data?.portals?.find(
          (portal) => portal.id === sale.assetId.toString()
        );
        // If portal is claimed, it means it is in fact a gotchi
        
        if (asset?.status === PortalStatus.Claimed) {
          // We search for the gotchi
          asset = gotchis.data?.aavegotchis?.find(
            (gotchi) => gotchi.id === sale.assetId.toString()
          );
          // And we search for his SVG
          const svg = svgs.data?.aavegotchis?.find(
            (svg) => svg.id === sale.assetId.toString()
          );
          // We return a SaleWithAsset object including gotchi & Svg
          return { ...sale, asset, svg };
        }
        if (asset) {
          // We return a SaleWithAsset object including portal
          return { ...sale, asset };
        }
        // If we don't find the asset, we return null
        return null;
      })
      // We filter out the nulls
      .filter((s) => s !== null) as SaleWithAsset[];

    setSalesWithAsset(data);
  }, [svgs, gotchis, portals, props.sales]);

  return (
    <div className="flex flex-row flex-wrap flex-x-5">
      {salesWithAsset?.map((sale) => {
        if (sale.svg) {
          return (
            <div key={sale.id.toString()} className="p-5">
              <SaleCard
                sale={sale}
                selected={selected}
                setSelected={setSelected}
              >
                <GotchiCard
                  gotchi={sale.asset as GotchiFieldsFragment}
                  svg={sale.svg}
                />
              </SaleCard>
            </div>
          );
        } else {
          return (
            <div key={sale.id.toString()} className="p-5">
              <SaleCard
                sale={sale}
                selected={selected}
                setSelected={setSelected}
              >
                <PortalCard
                  portal={sale.asset as PortalFieldsFragment}
                />
              </SaleCard>
            </div>
          );
        }
      })}
    </div>
  );
};
