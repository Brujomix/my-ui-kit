import { ModalProps } from "../../hooks/modals"
import { InfoIcon } from "../icons"
import { Button } from "../tags"

type ConfirmModalProps = {
  title: string
  subtitle?: string
  onConfirm: () => void
}

export default function ConfirmModal({ close, props: { title, subtitle, onConfirm } }: ModalProps<ConfirmModalProps>) {
  
  const handleConfirm = () => {
    onConfirm()
    close()
  }
  
  return (
    <>
      <InfoIcon className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
      <h2>{title}</h2>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      <Button onClick={handleConfirm}>Confirmar</Button>
    </>
  )
}