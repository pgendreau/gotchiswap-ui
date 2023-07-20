import { PortalFieldsFragment } from "@/graphql/core/__generated__/types";
import Image from "next/image";

export const PortalCard = (props: { portal: PortalFieldsFragment }) => {
  return (
    <>
      <Image
        src={
          props.portal.hauntId === 1
            ? "/images/h1_closed.avif"
            : "/images/h2_closed.avif"
        }
        width={120}
        height={120}
        alt="portal pic"
      />
      <div className="font-kanit text-sm text-center">
        {`H${props.portal.hauntId} Portal (${props.portal.id})`}
      </div>
    </>
  );
};
