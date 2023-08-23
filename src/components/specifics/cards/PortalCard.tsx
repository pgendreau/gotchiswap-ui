import { PortalFieldsFragment } from "@/graphql/core/__generated__/types";
import { classNames } from "@/helpers/tools";
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
        "w-32 md:w-48 flex flex-col place-items-center"
      )}
    >
      <Image
        src={
          portal.hauntId === 1
            ? "/images/h1_closed.avif"
            : "/images/h2_closed.avif"
        }
        width={120}
        height={120}
        alt="portal pic"
      />
      <div className="font-kanit text-sm text-center">
        {`H${portal.hauntId} Portal (${portal.id})`}
      </div>
    </div>
  );
};
