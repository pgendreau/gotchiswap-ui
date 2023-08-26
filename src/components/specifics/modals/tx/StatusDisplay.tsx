import { TxStatus } from "@/helpers/enums"

export const StatusDisplay = (props: {status: TxStatus}) => {
  switch (props.status) {
    case TxStatus.WAITING:
      return "Please sign the transaction in your wallet"
    case TxStatus.LOADING:
      return "Transaction in progress"
    case TxStatus.SUCCESS:
      return "Transaction successful"
    case TxStatus.ERROR:
      return "Transaction failed"
  }
}