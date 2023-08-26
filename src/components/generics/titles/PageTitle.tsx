import { PropsWithChildren } from "react";

export const PageTitle = (props: PropsWithChildren) => {
  return (
    <div className="page-title">
      {props.children}
    </div>
  );
}