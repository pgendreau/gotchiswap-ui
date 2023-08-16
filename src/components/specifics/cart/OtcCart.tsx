import { SectionTitle } from "@/components/generics/section/SectionTitle";
import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";
import { BaseCard } from "../cards/mini/BaseCard";

export const OtcCart = () => {
  const cartCtx = useContext(CartContext);

  return (
    <div>
      <SectionTitle>Yyour cArtY</SectionTitle>
      {!cartCtx.assets.length ? (
        <div className="text-2xl">
          <p>You haven't selected any assets yet</p>
        </div>
      ) : (
        <div className="flex flex-row flex-wrap justify-center gap-5">
          {cartCtx.assets.map((asset) => (
            <BaseCard asset={asset} key={asset.id} />
          )}
        </div>
      )}
    </div>
  );
};
