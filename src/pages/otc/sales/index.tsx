import ClientOnly from "@/components/generics/nextShit/ClientOnly";
import { BuysLoader } from "@/components/specifics/lists/BuysLoader";
import { SalesLoader } from "@/components/specifics/lists/SalesLoader";

const Sales = () => {
  return (
    <ClientOnly>
      <div className="flex flex-col justify-center gap-y-5">
        <div className="text-2xl">
          <p>OTC deals proposed to you.</p>
        </div>
        <BuysLoader />
        <div className="text-2xl">
          <p>OTC deals that you have created with the dapp.</p>
        </div>
        <SalesLoader />
      </div>
    </ClientOnly>
  );
};

export default Sales;
