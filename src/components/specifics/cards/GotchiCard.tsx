import { GotchiFieldsFragment } from "@/graphql/core/__generated__/types";
import { SvgFieldsFragment } from "@/graphql/svg/__generated__/types";
import { classNames } from "@/helpers/tools";

type GotchiCardProps = {
  gotchi: GotchiFieldsFragment;
  svg: SvgFieldsFragment | undefined;
  withBorders?: boolean | undefined;
};

export const GotchiCard = ({
  gotchi,
  svg,
  withBorders = false,
}: GotchiCardProps) => {
  return (
    <div
      className={classNames(
        withBorders ? "p-3" : "",
        "flex flex-col"
      )}
    >
      <div className="font-kanit text-sm text-center">
        {`${gotchi?.name} (${gotchi?.modifiedRarityScore})`}{" "}
      </div>
      {!!svg && (
        <div
          className="w-40 h-40"
          dangerouslySetInnerHTML={{
            __html: svg?.svg ?? "empty",
          }}
        />
      )}
      <div className="flex flex-col text-sm text-center">
        <div className="flex flex-row place-items-center justify-center mt-1">
          <div className="w-1/2">{`KIN ${gotchi?.kinship}`}</div>
          <div className="w-1/2">{`LVL ${gotchi?.level}`}</div>
        </div>
        <div className="flex flex-row place-items-center justify-center mt-1">
          <div className="w-1/2">{`NRG ${gotchi?.modifiedNumericTraits[0]}`}</div>
          <div className="w-1/2">{`AGG ${gotchi?.modifiedNumericTraits[1]}`}</div>
        </div>
        <div className="flex flex-row place-items-center justify-center mt-1">
          <div className="w-1/2">{`SPK ${gotchi?.modifiedNumericTraits[0]}`}</div>
          <div className="w-1/2">{`BRN ${gotchi?.modifiedNumericTraits[1]}`}</div>
        </div>
        <div className="flex flex-row place-items-center justify-center mt-1">
          <div className="w-1/2">{`EYS ${gotchi?.modifiedNumericTraits[0]}`}</div>
          <div className="w-1/2">{`EYC ${gotchi?.modifiedNumericTraits[1]}`}</div>
        </div>
      </div>
    </div>
  );
};
