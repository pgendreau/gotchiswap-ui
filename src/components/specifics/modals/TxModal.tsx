import { useContext } from 'react'
import { TxContext } from '@/contexts/TxContext'
import { BaseModal } from '@/components/generics/modals/BaseModal'
import { useWaitForTransaction } from 'wagmi'

export const TxModal = () => {
  const ctx = useContext(TxContext)
  if (!ctx) return <></>

  const { data, isError, isLoading, isSuccess } = useWaitForTransaction({ hash: ctx.txContextValue.hash })
  console.log("Tx Modal Rendered with hash: ", ctx.txContextValue.hash, ctx.txContextValue.operationStatus)
  return (
    <BaseModal>
      { ctx.txContextValue.operationStatus }
      { !!ctx.txContextValue.hash && (`Transaction hash: ${ctx.txContextValue.hash}`)}
      { isError && `Trannsaction failed...` }
      { isLoading && `Transaction pending...` }
      { isSuccess && `Transaction successful!` }
    </BaseModal>
  )
}