import { gotchiswapAbi } from "@/abis/gotchiswap-abi";
import {
  convertAddressType,
  createTxContext,
} from "@/helpers/tools";
import { SaleV2 } from "@/types/types";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { TxModal } from "../modals/tx/TxModal";
import router from "next/router";

export const BuyButton = (props: { sale: SaleV2 }) => {
  const prepareBuyTx = usePrepareContractWrite({
    address: convertAddressType(process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS),
    abi: gotchiswapAbi,
    functionName: "concludeSale",
    args: [props.sale.index],
  });

  const buyTx = useContractWrite(prepareBuyTx.config);

  const waitForTx = useWaitForTransaction({
    hash: buyTx.data?.hash,
  });

  if (waitForTx.isSuccess) {
    router.push("/otc/sales/success");
  }

  const txContext = createTxContext(
    "LFG ! Buy It !",
    buyTx.status,
    waitForTx.status,
    buyTx.data?.hash,
    buyTx.error,
    waitForTx.error
  );

  return (
    <>
      <button className="btn-base" onClick={() => buyTx.write?.()}>
        LFG ! Buy It !
      </button>
      <TxModal txContext={txContext} />
    </>
  );
};
