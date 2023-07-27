import { GotchiFieldsFragment } from "@/graphql/core/__generated__/types";
import { SvgFieldsFragment } from "@/graphql/svg/__generated__/types";


type GotchiCardProps = {
  gotchi: GotchiFieldsFragment;
  svg: SvgFieldsFragment | undefined;
};

export const GotchiCard = (props: GotchiCardProps) => {
  return (
    <div className="flex flex-col">
      <div className="font-kanit text-sm text-center">
        {`${props.gotchi?.name} (${props.gotchi?.modifiedRarityScore})`}{" "}
      </div>
      {!!props.svg && (
        <div
          className="w-40 h-40"
          dangerouslySetInnerHTML={{
            __html: props.svg?.svg ?? "empty",
          }}
        />
      )}
      <div className="flex flex-col text-sm text-center">
        <div className="flex flex-row place-items-center justify-center mt-1">
          <div className="w-1/2">{`KIN ${props.gotchi?.kinship}`}</div>
          <div className="w-1/2">{`LVL ${props.gotchi?.level}`}</div>
        </div>
        <div className="flex flex-row place-items-center justify-center mt-1">
          <div className="w-1/2">{`NRG ${props.gotchi?.modifiedNumericTraits[0]}`}</div>
          <div className="w-1/2">{`AGG ${props.gotchi?.modifiedNumericTraits[1]}`}</div>
        </div>
        <div className="flex flex-row place-items-center justify-center mt-1">
          <div className="w-1/2">{`SPK ${props.gotchi?.modifiedNumericTraits[0]}`}</div>
          <div className="w-1/2">{`BRN ${props.gotchi?.modifiedNumericTraits[1]}`}</div>
        </div>
        <div className="flex flex-row place-items-center justify-center mt-1">
          <div className="w-1/2">{`EYS ${props.gotchi?.modifiedNumericTraits[0]}`}</div>
          <div className="w-1/2">{`EYC ${props.gotchi?.modifiedNumericTraits[1]}`}</div>
        </div>
      </div>
    </div>
  );
};
