import { PortalFieldsFragment } from "@/graphql/core/__generated__/types";
import { classNames, getPortalImg } from "@/helpers/tools";
import Image from "next/image";

type PortalCardProps = {
  portal: PortalFieldsFragment;
  withBorders?: boolean | undefined;
  withBackground?: boolean | undefined;
};

export const PortalCard = ({
  portal,
  withBorders = false,
  withBackground = false,
}: PortalCardProps) => {
  return (
    <div
      className={classNames(
        withBorders ? "p-3" : "",
        withBackground ? "asset" : "",
        "w-24 md:w-36 flex flex-col place-items-center"
      )}
    >
      <div className="font-kanit text-sm text-center">
        {`H${portal.hauntId} Portal (${portal.id})`}
      </div>
      <Image src={getPortalImg(portal)} height={120} width={120} alt="portal pic" />

      <div className="text-xs text-center">
        {portal.status === "Bought" ? "Closed portal" : "Open portal"}
      </div>
    </div>
  );
};
