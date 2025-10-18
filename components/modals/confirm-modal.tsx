import { ModalProps } from '../../hooks/modals'
import { InfoIcon } from '../icons/info-icon'
import { Button } from '../tags/button'

type ConfirmModalProps = {
  title: string
  subTitle?: string
  onConfirm: () => void
}

export function ConfirmModal ({ close, props: { title, subTitle, onConfirm } }: ModalProps<ConfirmModalProps>) {
  const handleConfirm = () => {
    onConfirm()
    close()
  }

  return (
    <div className='p-6 max-w-md space-y-4'>
      <InfoIcon className='w-14 h-14 text-yellow-500 mx-auto mb-4' />
      <h2 className='text-center text-2xl'>{title}</h2>
      {subTitle && <p className=' text-gray-500 text-center text-xl'>{subTitle}</p>}
      <Button maxWidth color='primary' onClick={handleConfirm}>Confirmar</Button>
    </div>
  )
}
