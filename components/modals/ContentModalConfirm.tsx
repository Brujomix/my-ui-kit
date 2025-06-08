import { Button } from "../tags/Button"

type ContentConfirmModal = {
    title: string
    onConfirm : () => void
}

export function ContentModalConfirm({onConfirm, title}: ContentConfirmModal) {
    
  return (
    <div className="grid place-items-center gap-8">
        <p className="text-xl font-semibold">{title}</p>
        <p className="text-red-700 italic text-sm">Esta Acción no se puede Revertir</p>
        <Button onClick={onConfirm}><p>Confirmar</p></Button>
    </div>
  )
}