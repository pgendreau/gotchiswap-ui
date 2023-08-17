import { PortalFieldsFragment } from "@/graphql/core/__generated__/types";
import Image from "next/image";

export const PortalCard = (props: { asset: PortalFieldsFragment }) => {
  return (
    <>
      <Image
        src={
          props.asset.hauntId === 1
            ? "/images/h1_closed.avif"
            : "/images/h2_closed.avif"
        }
        width={60}
        height={60}
        alt="portal pic"
      />
      <div className="font-kanit text-xs text-center font-bold">
        {`H${props.asset.hauntId} Portal (${props.asset.id})`}
      </div>
    </>
  );
};
