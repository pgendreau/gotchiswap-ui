import { TxStatus } from "@/helpers/enums";
import { classNames } from "@/helpers/tools";

type LoaderProps = {
  status?: TxStatus | undefined;
}

export const Loader = ({ status = TxStatus.LOADING }: LoaderProps) => {
  return (
    <div className={classNames( status !== TxStatus.LOADING ? 'animate-pulse' : 'animate-spin-slow', "font-gotchi text-5xl text-gotchi-500")}>J</div>
  );
};
