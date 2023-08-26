import { PropsWithChildren } from "react";

export const CardLayout = (props: PropsWithChildren) => {
  return <div className="asset p-3 flex flex-col gap-y-1 place-items-center">{props.children}</div>
}