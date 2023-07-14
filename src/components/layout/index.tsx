import { PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "./sections/Header";
import { Footer } from "./sections/Footer";

export const Layout = (props: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen justify-between bg-purple-950  text-white font-katin font-medium">
      <Header />
      <div className="container mx-auto mb-auto md:pt-20 pt-10">
        <div className="mx-5">{props.children}</div>
      </div>
      <Footer />
    </div>
  );
};
