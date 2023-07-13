import Link from "next/link";
import Image from "next/image";
import { Profile } from "@/components/specifics/wallet/Profile";

export const Header = () => {
  return (
    <div className=" md:py-10 py-7 bg-gotchi-500 flex flex-col md:flex-row gap-y-5 justify-center place-items-center">
      <div className="flex-none lg:w-1/4 md:w-1/6 md:block hidden"></div>  
      <div className="grow flex justify-center place-items-center md:gap-x-10 gap-x-5 mx-2">
        <Link href="/">
          <Image src="/images/logo.png" alt="logo" width={120} height={120} />
        </Link>
        <Link href="/">
          <div className="lg:text-7xl md:text-6xl text-5xl font-gotchi font-medium text-center text-white">
            gotchiswap
          </div>
        </Link>
      </div>
      <div className="flex lg:justify-end justify-center place-items-center lg:w-1/4 md:w-1/6 w-full">
        <div className="px-10">
            <Profile />
        </div>
      </div>
    </div>
  );
};
