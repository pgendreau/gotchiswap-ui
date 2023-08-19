import { Loader } from "@/components/generics/loaders/Loader";
import { TxModal2 } from "@/components/specifics/modals/TxModal2";
import { CartContext } from "@/contexts/CartContext";
import { TxContext } from "@/contexts/TxContext";
import { TxStatus } from "@/helpers/enums";
import { useApprovalExec } from "@/hooks/ApprovalExec";
import { ApprovableAsset } from "@/types/types";
import { useContext, useEffect, useState } from "react";

export const ExecApproval = () => {
  const [approveTxStarted, setApproveTxStarted] = useState<boolean>(false);
  const cartCtx = useContext(CartContext);
  console.log("render ExecApproval");
  return (
    <>
      <div className="flex flex-col gap-y-5 place-items-center">
        <ul>
          {cartCtx.assets
            .filter(
              (asset) => !asset.approved && asset.__typename !== "wearable"
            )
            .map((asset) => (
              <li
                className="font-kanit before:content-['G.'] before:font-gotchi before:mr-1"
                key={asset.id}
              >
                {asset.__typename} {asset.id} needs to be approved
              </li>
            ))}
          {cartCtx.assets.findIndex(
            (asset) => !asset.approved && asset.__typename === "wearable"
          ) > -1 && (
            <li className="font-kanit before:content-['V.'] before:font-gotchi before:mr-1">
              Wearables need to be approved
            </li>
          )}
        </ul>
        {!approveTxStarted && (
          <button
            className="btn-pink"
            onClick={() => {
              setApproveTxStarted(true);
            }}
          >
            Approuver
          </button>
        )}

        {approveTxStarted && <ExecTx />}
      </div>
    </>
  );
};

const ExecTx = () => {
  console.log("render ExecTx");
  const { status, txContext } = useApprovalExec();
  const { setTxContextValue } = useContext(TxContext);

  // useEffect( () => {
  //   console.log('useEffect in ExecTx', txContext.status)
  //   setTxContextValue(txContext)
  // }, [txContext, setTxContextValue])

  return (
    <>
      <TxModal2 txContext={txContext} />
      <div className="flex flex-row gap-x-5 justify-center">
        <Loader />
        <p>{txContext.status}</p>
      </div>
    </>
  );
};
