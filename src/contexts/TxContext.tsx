import { WriteContractResult } from "@wagmi/core";
import {
  PropsWithChildren,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// Create the context type. It contains all data needed to know the status of an ongoing Tx
export type TxContextType = {
  operationStatus: string;
  hash: `0x${string}` | undefined;
  error: Error | null;
  status: "error" | "idle" | "success" | "loading" | null;
};

// Empty context value for setup
export const txContextDefaultValue: TxContextType = {
  hash: undefined,
  error: null,
  status: null,
  operationStatus: "",
};

// The context itself
export const TxContext = createContext<{txContextValue: TxContextType; setTxContextValue: Dispatch<SetStateAction<TxContextType>>;} | null>(null);

// The context provider
// By embedding a state in the context, we can use it to read / write the status of the Tx in any component through useContext function
export const TxContextProvider = (props: PropsWithChildren) => {
  const [txContextValue, setTxContextValue] = useState<TxContextType>(
    txContextDefaultValue
  );
  return (
    <TxContext.Provider value={{ txContextValue, setTxContextValue }}>
      {props.children}
    </TxContext.Provider>
  );
};
