import { GotchiFieldsFragment } from "@/graphql/core/__generated__/graphql";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { readContract, prepareWriteContract, writeContract } from "@wagmi/core";
import { aavegotchiAbi } from "@/abis/aavegotchi";
import { convertAddressType } from "@/helpers/tools";
import { useAccount, usePrepareContractWrite, useContractRead, useContractWrite } from "wagmi";
import ClientOnly from "@/components/generics/nextShit/ClientOnly";
import { ConnectKitButton } from "connectkit";
import { TxContext, TxContextType } from "@/contexts/TxContext";
import { useContext, useState } from "react";
import { ModalContext } from "@/contexts/ModalContext";

type OtcFormProps = {
  selectedAsset: GotchiFieldsFragment | null;
};

type OtcFormValues = {
  price: number;
  address: string;
};

export const OtcForm = (props: OtcFormProps) => {
  const txCtx = useContext(TxContext);
  const modalCtx = useContext(ModalContext);
  const { address, isConnected } = useAccount();
  const [submitted, setSubmitted] = useState(false);

  const checkApproval = async (gotchiId: string): Promise<Boolean> => {
    const txContextVar: TxContextType = {
      error: null,
      status: "loading",
      hash: undefined,
      operationStatus: "Checking if Gotchi is approved for transfer",
    };
    if (txCtx) txCtx.setTxContextValue(txContextVar);
    if (modalCtx) modalCtx.setOpen(true);

    const data = await readContract({
      address: convertAddressType(
        process.env.NEXT_PUBLIC_AAVEGOTCHI_CONTRACT_ADDRESS
      ),
      abi: aavegotchiAbi,
      functionName: "getApproved",
      args: [gotchiId],
    });

    return (
      data == convertAddressType(process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS)
    );
  };

  const sendApproval = async (gotchiId: string) => {
    
    const txContextVar: TxContextType = {
      error: null,
      status: "idle",
      hash: undefined,
      operationStatus:
        "Preparing Transaction to approve Gotchi transfer to OTC contract",
    };
    if (txCtx) txCtx.setTxContextValue(txContextVar);
    if (modalCtx) modalCtx.setOpen(true);
    try {
/*      const { request } = await prepareWriteContract({
        address: convertAddressType(
          process.env.NEXT_PUBLIC_AAVEGOTCHI_CONTRACT_ADDRESS
        ),
        abi: aavegotchiAbi,
        functionName: "approve",
        args: [
          convertAddressType(process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS),
          gotchiId,
        ],
      }); */

      const { config } = usePrepareContractWrite({
        address: convertAddressType(
          process.env.NEXT_PUBLIC_AAVEGOTCHI_CONTRACT_ADDRESS
        ),
        abi: aavegotchiAbi,
        functionName: "interact",
        args: [
          [gotchiId],
        ],
      });

      // const { request } = await prepareWriteContract({
      //   address: convertAddressType(
      //     process.env.NEXT_PUBLIC_AAVEGOTCHI_CONTRACT_ADDRESS
      //   ),
      //   abi: aavegotchiAbi,
      //   functionName: "interact",
      //   args: [
      //     [gotchiId],
      //   ],
      // });

      const txContextVar2: TxContextType = {
        error: null,
        status: "idle",
        hash: undefined,
        operationStatus:
          "Waiting for transaction to be signed",
      };
      if (txCtx) txCtx.setTxContextValue(txContextVar2);

      const { hash } = await writeContract(request);
      
      const txContextVar3: TxContextType = {
        error: null,
        status: "idle",
        hash: hash,
        operationStatus:
        "Approving Gotchi transfer to OTC contract",
      };
      if (txCtx) txCtx.setTxContextValue(txContextVar3);
    } catch (error) {
      txContextVar.status = "error";
      txContextVar.operationStatus =
        "Error approving Gotchi transfer to OTC contract";
      console.log(error);
      if (txCtx) txCtx.setTxContextValue(txContextVar);
    }
  };

  const handleSubmit = async (
    values: OtcFormValues,
    { setSubmitting }: FormikHelpers<OtcFormValues>
  ) => {
    if (!props.selectedAsset?.id) {
      console.log("no asset selected");
      return;
    }

    const isApproved = await checkApproval(props.selectedAsset?.id);

    if (!isApproved) {
      sendApproval(props.selectedAsset?.id);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          price: 0,
          address: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex flex-col lg:flex-row justify-center place-items-center gap-y-2 lg:gap-x-10 leading-8">
            <div className="flex flex-col md:flex-row justify-center gap-y-2 md:gap-x-5">
              <label htmlFor="address">Address</label>
              <Field
                id="address"
                name="address"
                type="text"
                size="42"
                maxLength="42"
                className="text-purple-950 pl-1"
              />
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-y-2 md:gap-x-5">
              <label htmlFor="price">Price (GHST)</label>
              <Field
                id="price"
                name="price"
                type="number"
                className="text-purple-950 pl-1"
              />
            </div>
            <ClientOnly>
              {isConnected && address ? (
                <div>
                  <button
                    className="bg-purple-800 hover:bg-gotchi-500 px-8"
                    type="submit"
                  >
                    Create Otc
                  </button>
                </div>
              ) : (
                <ConnectKitButton />
              )}
            </ClientOnly>
          </div>
        </Form>
      </Formik>
    </>
  );
};
