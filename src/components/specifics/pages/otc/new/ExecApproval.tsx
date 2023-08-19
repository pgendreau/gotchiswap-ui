import { useApprovalExec } from "@/hooks/ApprovalExec"
import { ApprovableAsset } from "@/types/types"

export const ExecApproval =  (props: {approvableAssets: ApprovableAsset[]}) => {
  const approvedAssets = useApprovalExec(props.approvableAssets)
  return <div className="btn-pink">Approval in progress</div>
}