import { ghstAbi } from "@/abis/ghst";
import { convertAddressType } from "@/helpers/tools";
import { SaleWithAsset } from "@/types/types";
import { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { BuyButton } from "./BuyButton";
import { ApproveBuyButton } from "./ApproveBuyButton";

export const CheckApproveBeforeBuyButton = (props: { sale: SaleWithAsset }) => {
  const [neededAllowance, setNeededAllowance] = useState<bigint>(props.sale.priceInWei);
  const { address, isConnected } = useAccount();

  const { data, isSuccess, status, error } = useContractRead({
    address: convertAddressType(process.env.NEXT_PUBLIC_GHST_CONTRACT_ADDRESS),
    abi: ghstAbi,
    functionName: "allowance",
    args: [
      address ?? "0x0",
      convertAddressType(process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS),
    ]// ,watch: true
  });

  useEffect(() => {
    if (data !== undefined && status === "success") {
      const allowance = BigInt(data);
      if (allowance < props.sale.priceInWei) {
        setNeededAllowance(props.sale.priceInWei - allowance);
      }
    }
  }, [data, props.sale.priceInWei, status]);

  if (status === "error") {
    console.log(error);
    return <div>An error occured</div>;
  }

  if (status === "loading" || status === "idle") {
    return <div>Checking GHST allowance</div>;
  }

  if (data !== undefined) {
    if (props.sale.priceInWei > data || neededAllowance > BigInt(0)) {
      return (
        <ApproveBuyButton
          sale={props.sale}
          neededAllowance={neededAllowance}
          setNeededAllowance={setNeededAllowance}
        />
      );
    } else {
      return <BuyButton sale={props.sale} />;
    }
  }
  return <div>An error occured</div>;
};
