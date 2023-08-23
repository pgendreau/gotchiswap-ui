import {
  PortalStatus,
  useGotchisByIdQuery,
  usePortalsByIdQuery,
} from "@/graphql/core/__generated__/types";
import { useGotchisSvgQuery } from "@/graphql/svg/__generated__/types";
import { AssetClass } from "@/helpers/enums";
import { SaleV2 } from "@/types/types";
import { SaleCard } from "../cards/SaleCard";
import { setBlockGasLimit } from "viem/dist/types/actions/test/setBlockGasLimit";

export const SalesListing = (props: { sales: SaleV2[] }) => {
  // First we need to get all gotchi ids and portal ids from the sales
  // We grab them all at once so we do not need to multiply graph queries.
  const idsArray = props.sales.map((sale) =>
    sale.assets
      .filter(
        (saleItem) =>
          saleItem.class === AssetClass.ERC721 &&
          saleItem.contract ===
            process.env.NEXT_PUBLIC_AAVEGOTCHI_CONTRACT_ADDRESS
      )
      .map((saleItem) => saleItem.id.toString())
  );

  const ids = idsArray.flat();

  const portalsAndGotchis = usePortalsByIdQuery({
    variables: { ids: ids },
    context: { clientName: "core" },
    skip: !ids.length,
  });

  const gotchiIds = portalsAndGotchis.data?.portals
    .filter((portal) => portal.status === PortalStatus.Claimed)
    .map((portal) => portal.id);

  const portals = portalsAndGotchis.data?.portals.filter(
    (portal) => portal.status !== PortalStatus.Claimed   
  )

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

  return (
    <div className='flex flex-col gap-y-10'>
      {props.sales.map((sale) => (
        <SaleCard
          key={sale.index.toString()}
          sale={sale}
          gotchis={gotchis.data?.aavegotchis ?? []}
          portals={portals ?? []}
          svgs={svgs.data?.aavegotchis ?? []}
        />
      ))}
    </div>
  );
};
