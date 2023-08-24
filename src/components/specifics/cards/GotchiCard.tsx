import { classNames } from "@/helpers/tools";
import { Gotchi } from "@/types/types";

type GotchiCardProps = {
  gotchi: Gotchi;
  withBorders?: boolean | undefined;
  withBackground?: boolean | undefined;
};

export const GotchiCard = ({
  gotchi,
  withBorders = false,
  withBackground = false,
}: GotchiCardProps) => {
  return (
    <div
      className={classNames(
        withBorders ? "p-3" : "", withBackground ? 'asset' : "",
        "flex flex-col"
      )}
    >
      <div className="font-kanit text-sm text-center">
        {`${gotchi?.name} (${gotchi?.modifiedRarityScore})`}{" "}
      </div>
      {!!gotchi.svg && (
        <div
          className="md:w-40 md:h-40 w-30"
          dangerouslySetInnerHTML={{
            __html: gotchi.svg?.svg ?? "empty",
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
          <div className="w-1/2">{`SPK ${gotchi?.modifiedNumericTraits[2]}`}</div>
          <div className="w-1/2">{`BRN ${gotchi?.modifiedNumericTraits[3]}`}</div>
        </div>
        <div className="flex flex-row place-items-center justify-center mt-1">
          <div className="w-1/2">{`EYS ${gotchi?.modifiedNumericTraits[4]}`}</div>
          <div className="w-1/2">{`EYC ${gotchi?.modifiedNumericTraits[5]}`}</div>
        </div>
      </div>
    </div>
  );
};
