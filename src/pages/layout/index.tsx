import { PropsWithChildren } from "react";
import Image from "next/image";

export const Layout = (props: PropsWithChildren) => {
  return (
    <div className="flex flex-col h-screen justify-between bg-purple-950  text-white">
      <div className="flex justify-center place-items-center py-10 gap-x-10 bg-gotchi-500">
        <Image src="/images/logo.png" alt="logo" width={120} height={120} />
        <div className="text-7xl font-gotchi font-medium text-center text-white">
          gotchiswap
        </div>
      </div>
      <div className="container mx-auto mb-auto pt-20">{props.children}</div>
      <div className="container mx-auto">
        <div className="text-center text-2xl font-gotchi font-medium px-5 pt-20 pb-5">
          made by pg & fifoooo
        </div>
      </div>
    </div>
  );
};
