import Link from "next/link";
import Image from "next/image";
import { Profile } from "@/components/specifics/wallet/Profile";
import ClientOnly from "@/components/generics/nextShit/ClientOnly";

export const Header = () => {
  return (
    <div className="md:py-10 py-7 bg-gradient-to-r from-violet-800 to-gotchi-500 flex flex-col md:flex-row gap-y-5 justify-center place-items-center">
    {/* <div className=" md:py-10 py-7 bg-[#672EEB] flex flex-col md:flex-row gap-y-5 justify-center place-items-center"> */}
      <div className="flex-none lg:w-1/4 md:w-1/6 md:block hidden"></div>
      <div className="grow flex justify-center place-items-center md:gap-x-10 gap-x-6 mx-2">
        <Link href="/">
          <Image src="/images/logo_v2.png" alt="logo" width={140} height={140} />
        </Link>
        <Link href="/">
          <div className="lg:text-7xl md:text-6xl text-5xl font-gotchi font-medium text-center text-white">
            gotchiswAp
          </div>
        </Link>
      </div>
      <div className="flex lg:justify-end justify-center place-items-center lg:w-1/4 md:w-1/6 w-full">
        <div className="px-10">
          <ClientOnly>
            <Profile />
          </ClientOnly>
        </div>
      </div>
    </div>
  );
};
