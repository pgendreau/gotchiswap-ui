import { TxStatus } from "@/helpers/enums";
import { useApprovalCheck } from "@/hooks/ApprovalCheck";
import { Loader } from "@/components/generics/loaders/Loader";

export const CheckApproval = () => {
  const { status } = useApprovalCheck();

  return (
    <>
      {status === TxStatus.LOADING && (
        <div className="flex flex-row gap-x-5 justify-center">
          <Loader />
          <p>Checking approval status</p>
        </div>
      )}
    </>
  );
};
