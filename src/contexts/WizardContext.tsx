import { OtcWizardStatus } from "@/helpers/enums";
import {
  PropsWithChildren,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";


// The context itself
// Note the undefined! type assertion. This is a non-null assertion operator. It tells the compiler that the value is not null or undefined.
// That trick prevents the compiler from complaining about the value being undefined. 
export const OtcWizardContext = createContext<{status: OtcWizardStatus; setStatus: Dispatch<SetStateAction<OtcWizardStatus>>;}>(undefined!);

export const OtcWizardContextProvider = (props: PropsWithChildren) => {
  const [status, setStatus] = useState<OtcWizardStatus>(OtcWizardStatus.SELECTING_ASSET);
  return (
    <OtcWizardContext.Provider value={{ status, setStatus }}>
      {props.children}
    </OtcWizardContext.Provider>
  );
};