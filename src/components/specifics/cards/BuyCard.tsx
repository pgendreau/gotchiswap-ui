import { SaleWithAsset } from "@/types/types";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { classNames, readablePrice, shortenAddress } from "@/helpers/tools";
import { CheckApproveBeforeBuyButton } from "../buttons/CheckApproveBeforeBuyButton";

type SaleCardProps = PropsWithChildren & {
  sale: SaleWithAsset;
  selected: bigint;
  setSelected: Dispatch<SetStateAction<bigint>>;
};

export const BuyCard = (props: SaleCardProps) => {
  return (
    <div
      onClick={() => {
        props.selected === props.sale.assetId
          ? props.setSelected(BigInt(0))
          : props.setSelected(props.sale.assetId);
      }}
      className={classNames(
        props.selected === props.sale.assetId
          ? "bg-gotchi-500"
          : "bg-purple-800",
        "flex flex-row gap-x-5 p-5 rounded-xl cursor-pointer"
      )}
    >
      {props.children}
      <div className="flex flex-col gap-y-5 w-48">
        <div>{`Price: ${readablePrice(props.sale.priceInWei)} GHST`}</div>
        <div>{`Seller: ${shortenAddress(props.sale.seller)}`}</div>
        {props.sale.assetId === props.selected && (
          <CheckApproveBeforeBuyButton sale={props.sale} />
        )}
      </div>
    </div>
  );
};
