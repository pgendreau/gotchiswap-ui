import { OtcWizardStatus } from "@/helpers/enums";
import { ApprovableAsset, SelectableAsset } from "@/types/types";
import { Dispatch, SetStateAction, useState } from "react";

type CheckApprovalProps = {
  wizardState: OtcWizardStatus;
  setWizardState: Dispatch<SetStateAction<OtcWizardStatus>>;
  assets: SelectableAsset[];
}

export const CheckApproval = (props: CheckApprovalProps) => {
  
}