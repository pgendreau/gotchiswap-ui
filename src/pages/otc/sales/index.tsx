import { BuysListing } from "@/components/specifics/lists/BuysListing";
import { SalesLoader } from "@/components/specifics/lists/SalesLoader";

const Sales = () => {
  return (
    <div className="flex flex-col justify-center gap-y-5">
      <div className="text-2xl">
        <p>OTC deals proposed to you.</p>
      </div>
      <BuysListing />
      <div className="text-2xl">
        <p>OTC deals that you have created with the dapp.</p>
      </div>
      <SalesLoader />
    </div>
  );
};

export default Sales;
