import {
  PropsWithChildren,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";


// The context itself
export const ModalContext = createContext<{open: boolean; setOpen: Dispatch<SetStateAction<boolean>>;} | null>(null);

// The context provider
// By embedding a state in the context, we can use it to read / write the status of the Tx in any component through useContext function
export const ModalContextProvider = (props: PropsWithChildren) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {props.children}
    </ModalContext.Provider>
  );
};
