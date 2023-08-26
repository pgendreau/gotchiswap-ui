import { PortalFieldsFragment } from "@/graphql/core/__generated__/types";
import { getPortalImg } from "@/helpers/tools";
import Image from "next/image";

export const PortalCard = (props: { asset: PortalFieldsFragment }) => {
  return (
    <>
      <div className="font-kanit text-xs text-center font-bold">
        {`H${props.asset.hauntId} Portal (${props.asset.id})`}
      </div>
      <Image
        src={getPortalImg(props.asset)}
        width={60}
        height={60}
        alt="portal pic"
      />
      <div className="text-xs text-center">
        {props.asset.status === "Bought" ? "Closed portal" : "Open portal"}
      </div>
    </>
  );
};
