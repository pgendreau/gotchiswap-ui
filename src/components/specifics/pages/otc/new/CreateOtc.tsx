import { gotchiswapAbi } from "@/abis/gotchiswap-abi";
import { CartContext } from "@/contexts/CartContext";
import { AssetClass, OtcWizardStatus, TxStatus } from "@/helpers/enums";
import {
  SelectableAsset,
  TxContextType,
  txContextDefaultValue,
} from "@/types/types";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {
  convertAddressType,
  convertTxStatus,
  isAddressValid,
} from "@/helpers/tools";
import { TxModal } from "@/components/specifics/modals/tx/TxModal";
import { OtcWizardContext } from "@/contexts/WizardContext";
import { useRouter } from "next/router";
import { BaseError } from "viem";

const prepareAssetsArrays = (
  assets: SelectableAsset[]
): {
  assetClasses: number[];
  assetContracts: `0x${string}`[];
  assetIds: bigint[];
  assetAmounts: bigint[];
} => {
  const assetClasses: number[] = [];
  const assetContracts: `0x${string}`[] = [];
  const assetIds: bigint[] = [];
  const assetAmounts: bigint[] = [];
  assets.forEach((asset) => {
    switch (asset.__typename) {
      case "Aavegotchi":
      case "Portal":
        assetClasses.push(AssetClass.ERC721);
        assetContracts.push(
          process.env.NEXT_PUBLIC_AAVEGOTCHI_CONTRACT_ADDRESS
        );
        assetIds.push(BigInt(asset.id));
        assetAmounts.push(BigInt(1));
        break;
      case "wearable":
        assetClasses.push(AssetClass.ERC1155);
        assetContracts.push(process.env.NEXT_PUBLIC_WEARABLE_CONTRACT_ADDRESS);
        assetIds.push(BigInt(asset.id));
        assetAmounts.push(BigInt(asset.qty));
        break;
    }
  });
  return { assetClasses, assetContracts, assetIds, assetAmounts };
};

const preparePricesArray = (
  price: number
): {
  priceClasses: number[];
  priceContracts: `0x${string}`[];
  priceIds: bigint[];
  priceAmounts: bigint[];
} => {
  const priceClasses: number[] = [];
  const priceContracts: `0x${string}`[] = [];
  const priceIds: bigint[] = [];
  const priceAmounts: bigint[] = [];
  priceClasses.push(AssetClass.ERC20);
  priceContracts.push(process.env.NEXT_PUBLIC_GHST_CONTRACT_ADDRESS);
  priceIds.push(BigInt(0));
  priceAmounts.push(BigInt(price) * BigInt(10 ** 18));
  return { priceClasses, priceContracts, priceIds, priceAmounts };
};

export const CreateOtc = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [targetWallet, setTargetWallet] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const cartCtx = useContext(CartContext);
  const [txContext, setTxContext] = useState<TxContextType>(
    txContextDefaultValue
  );

  return (
    <>
      <div className="flex flex-col gap-y-5 place-items-center">
        <p>All assets have been approved. You can now create the sale.</p>
        <div className="flex flex-col justify-center place-items-center gap-y-4 lg:gap-x-10 leading-8">
          <div className="flex flex-col md:flex-row justify-center gap-y-2 md:gap-x-5 w-full">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              disabled={submitted}
              className="text-purple-950 pl-1 w-full"
              onChange={(e) => setTargetWallet(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-y-2 md:gap-x-5">
            <label htmlFor="price">Price (GHST)</label>
            <input
              id="price"
              name="price"
              type="number"
              disabled={submitted}
              className="text-purple-950 pl-1"
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
          </div>
        </div>
        {price > 0 && isAddressValid(targetWallet) && (
          <TxButton
            address={targetWallet}
            price={price}
            submitted={submitted}
            setSubmitted={setSubmitted}
          />
        )}
      </div>
    </>
  );
};

const TxButton = (props: {
  address: string;
  price: number;
  submitted: boolean;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
}) => {
  const cartCtx = useContext(CartContext);
  const wizardCtx = useContext(OtcWizardContext);
  const router = useRouter();
  // Get the assets & prices prepared for the tx
  const preparedAssets = prepareAssetsArrays(cartCtx.assets);
  const preparedPrices = preparePricesArray(props.price);

  // Prepare the tx
  const preparedTx = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_OTC_CONTRACT_ADDRESS,
    abi: gotchiswapAbi,
    functionName: "createSale",
    args: [
      preparedAssets.assetClasses,
      preparedAssets.assetContracts,
      preparedAssets.assetIds,
      preparedAssets.assetAmounts,
      preparedPrices.priceClasses,
      preparedPrices.priceContracts,
      preparedPrices.priceIds,
      preparedPrices.priceAmounts,
      convertAddressType(props.address),
    ],
  });

  // Initialize the tx
  const txWriteData = useContractWrite(preparedTx.config);

  const txWaitData = useWaitForTransaction({ hash: txWriteData.data?.hash });

  let txContext: TxContextType = {
    operation: "Create OTC offer",
    hash: "0x0",
    status: TxStatus.IDLE,
  };

  if (txWriteData.status === "loading" && txWaitData.status === "idle") {
    txContext = {
      operation: "Create OTC offer",
      hash: "0x0",
      status: TxStatus.WAITING,
    };
  }

  if (txWriteData.isError || txWaitData.isError) {
    let errorMessage = "An error has occured. Please try again.";
    if (txWriteData.error instanceof BaseError) {
      errorMessage = txWriteData.error.shortMessage;
    } else if (txWaitData.error instanceof BaseError) {
      errorMessage = txWaitData.error.shortMessage;

      txContext = {
        operation: errorMessage,
        hash: txWriteData.data?.hash,
        status: TxStatus.ERROR,
      };
      props.setSubmitted(false);
    }
  }

  if (txWriteData.isSuccess && txWaitData.isLoading) {
    txContext = {
      operation: "Create OTC offer",
      hash: txWriteData.data?.hash,
      status: TxStatus.LOADING,
    };
  }

//   Modal UseEffect 4
// TxModal.tsx:14 Modal UseEffect 1
// client.js:1 Warning: Cannot update a component (`CartContextProvider`) while rendering a different component (`TxButton`). To locate the bad setState() call inside `TxButton`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
//     at TxButton (webpack-internal:///./src/components/specifics/pages/otc/new/CreateOtc.tsx:185:70)
//     at div
//     at CreateOtc (webpack-internal:///./src/components/specifics/pages/otc/new/CreateOtc.tsx:79:86)
//     at div
//     at NewContent (webpack-internal:///./src/pages/otc/new/index.tsx:30:92)
//     at OtcWizardContextProvider (webpack-internal:///./src/contexts/WizardContext.tsx:20:80)
//     at New
//     at div
//     at div
//     at div
//     at Layout (webpack-internal:///./src/components/layout/index.tsx:24:37)
//     at ModalContextProvider (webpack-internal:///./src/contexts/ModalContext.tsx:18:76)
//     at TxContextProvider (webpack-internal:///./src/contexts/TxContext.tsx:20:96)
//     at CartContextProvider (webpack-internal:///./src/contexts/CartContext.tsx:18:80)
//     at QueryClientProvider (webpack-internal:///./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs:48:3)
//     at WagmiConfig (webpack-internal:///./node_modules/wagmi/dist/index.js:134:3)
//     at InjectWagmi (webpack-internal:///./src/components/hoc/wagmi/index.tsx:55:33)
//     at ApolloProvider (webpack-internal:///./node_modules/@apollo/client/react/context/ApolloProvider.js:12:21)
//     at InjectApollo (webpack-internal:///./src/components/hoc/apollo/index.tsx:26:25)
//     at App (webpack-internal:///./src/pages/_app.tsx:28:11)
//     at PathnameContextProviderAdapter (webpack-internal:///./node_modules/next/dist/shared/lib/router/adapters.js:74:11)
//     at ErrorBoundary (webpack-internal:///./node_modules/next/dist/compiled/@next/react-dev-overlay/dist/client.js:306:63)
//     at ReactDevOverlay (webpack-internal:///./node_modules/next/dist/compiled/@next/react-dev-overlay/dist/client.js:858:919)
//     at Container (webpack-internal:///./node_modules/next/dist/client/index.js:92:1)
//     at AppContainer (webpack-internal:///./node_modules/next/dist/client/index.js:197:11)
//     at Root (webpack-internal:///./node_modules/next/dist/client/index.js:380:11)


  if (txWaitData.isSuccess) {
    //cartCtx.setAssets([]);
    //wizardCtx.setStatus(OtcWizardStatus.CREATED);
    router.push("/otc/success");
  }

  return (
    <div>
      <button
        className="btn-gotchi"
        disabled={
          !txWriteData.write ||
          txWriteData.status === "loading" ||
          txWriteData.status === "success"
        }
        onClick={() => {
          props.setSubmitted(true);
          txWriteData.write && txWriteData.write();
        }}
      >
        Create sale
      </button>
      <TxModal txContext={txContext} />
    </div>
  );
};
