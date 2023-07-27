import { useContext, useState } from "react";
import { TxContext, TxContextType } from "@/contexts/TxContext";
import { BaseModal } from "@/components/generics/modals/BaseModal";
import { useWaitForTransaction } from "wagmi";
import { ModalContext } from "@/contexts/ModalContext";
import { shortenAddress } from "@/helpers/tools";

const TxStatus = (props: TxContextType) => {
  // const { data, isError, isLoading } = useWaitForTransaction({ hash: props.hash })

  // if (isLoading) return <div>Processing…</div>
  // if (isError) return <div>Transaction error</div>

  return (
    <div className="flex flex-col gap-y-3">
      <div>{props.operation}</div>
      <div>Tx status: {props.status}</div>
      <div>Tx hash: {shortenAddress(props.hash)}</div>
    </div>
  );
};

export const TxModal = () => {
  const ctx = useContext(TxContext);
  // const [open, setOpen] = useState(false)
  if (!ctx || !ctx.txContextValue.hash) return <></>;
  console.log("open modal");
  // setOpen(true)
  return (
    <BaseModal>
      <TxStatus {...ctx.txContextValue} />
    </BaseModal>
  );
};
