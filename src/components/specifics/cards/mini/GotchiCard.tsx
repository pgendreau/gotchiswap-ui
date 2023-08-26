import { Gotchi } from "@/types/types";

export const GotchiCard = (props: { asset: Gotchi }) => {
  return (
    <>
      <div className="font-kanit text-xs text-center font-bold">{props.asset?.name}</div>
      {!!props.asset.svg && (
        <div
          className="w-20 h-20"
          dangerouslySetInnerHTML={{
            __html: props.asset.svg?.svg ?? "empty",
          }}
        />
      )}
    </>
  );
};
