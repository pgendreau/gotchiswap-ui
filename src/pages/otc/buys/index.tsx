import { BuysListing } from "@/components/specifics/lists/BuysListing";
import { Sale } from "@/types/types";
import { useState } from "react";
import { useAccount } from "wagmi";

const Buys = () => {
  
  return (
    <div className="flex flex-col justify-center gap-y-5">
      <div className="text-2xl">
        <p>
          Here is the list of all the OTC deals that have been proposed to you 
        </p>
      </div>
      <BuysListing />
    </div>
  );
};

export default Buys;
