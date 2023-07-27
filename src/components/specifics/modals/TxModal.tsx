import { useContext } from 'react'
import { TxContext, TxContextType } from '@/contexts/TxContext'
import { BaseModal } from '@/components/generics/modals/BaseModal'
import { useWaitForTransaction } from 'wagmi'
import { ModalContext } from '@/contexts/ModalContext'

const TxStatus = (props: TxContextType) => {
  
  const { data, isError, isLoading } = useWaitForTransaction({ hash: props.hash })

  if (isLoading) return <div>Processing…</div>
  if (isError) return <div>Transaction error</div>
  
  return <div>Transaction: {JSON.stringify(data)}</div>
}

export const TxModal = () => {
  const ctx = useContext(TxContext)
  const modalCtx = useContext(ModalContext)

  if (!ctx || !ctx.txContextValue.hash) return <></>
  modalCtx?.setOpen(true)
  return (
    <BaseModal>
      <TxStatus {...ctx.txContextValue} />
    </BaseModal>
  )
}

