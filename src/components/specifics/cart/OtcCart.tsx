import { SectionTitle } from "@/components/generics/section/SectionTitle";
import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";
import { BaseCard } from "../cards/mini/BaseCard";
import { CardLayout } from "../cards/mini/CardLayout";
import { SelectableAsset } from "@/types/types";

const countCartItems = (cart: SelectableAsset[]): number => {
  const count = cart.reduce((acc, curr) => {
    if (curr.__typename === "wearable") {
      return acc + curr.qty;
    }
    return acc + 1;
  }, 0);
  return count;
};

const displayCartCount = (cart: SelectableAsset[]): string => {
  const count = countCartItems(cart);
  if (count === 0) {
    return "";
  }
  return `(${count})`;
};

export const OtcCart = () => {
  const cartCtx = useContext(CartContext);

  return (
    <div>
      <SectionTitle>your cArt Y {displayCartCount(cartCtx.assets)}</SectionTitle>
      {!cartCtx.assets.length ? (
        <div className="text-2xl">
          <p>You haven't selected any assets yet</p>
        </div>
      ) : (
        <div className="flex flex-row flex-wrap justify-center gap-5">
          {cartCtx.assets.map((asset) => (
            <CardLayout key={asset.id}>
              <BaseCard asset={asset} />
            </CardLayout>
          ))}
          { !!(cartCtx.assets.length > 0) && (
            <button className='btn-pink object-cover w-20'>Next</button>
          )}
          </div>
      )}
    </div>
  );
};
