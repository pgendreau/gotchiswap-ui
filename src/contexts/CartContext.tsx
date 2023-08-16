import { SelectableAsset } from "@/types/types";
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
export const CartContext = createContext<{assets: SelectableAsset[]; setAssets: Dispatch<SetStateAction<SelectableAsset[]>>;}>(undefined!);

export const CartContextProvider = (props: PropsWithChildren) => {
  const [assets, setAssets] = useState<SelectableAsset[]>([]);
  return (
    <CartContext.Provider value={{ assets, setAssets }}>
      {props.children}
    </CartContext.Provider>
  );
};