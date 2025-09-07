import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { FormField } from './form-field'
import { CameraIcon, CrossIcon } from '../icons'
import { QrLector } from '../qr'
import { ModalProps, useModals } from '../../hooks/modals'

interface Props {
  label?: string
  name: string
  validation?: (result: string) => boolean
}

export function InputQr ({ name, label }: Props) {
  const { open } = useModals()
  const { register, formState: { errors }, setValue } = useFormContext()

  const three = name.split('.')
  const isArray = three.length > 1

  const errorMessage =
      !isArray
        ? errors?.[name]?.message as string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        : (errors as any)?.[three[0]]?.[parseInt(three[1])]?.[three[2]]?.message as string

  const handleModalOpen = () => {
    const callback = (result: string) => {
      setValue(name, result, { shouldValidate: true })
    }

    open({
      Component: ModalQrReader,
      props: { callback }
    })
  }

  return (
    <FormField
      label={label}
      error={errorMessage}
    >
      <button
        type='button'
        className='absolute top-3 right-3'
        onClick={handleModalOpen}
      >
        <CameraIcon className='w-4 h-4' />
      </button>
      <input
        className={clsx(
          'text-sm font-medium text-gray-900 bg-white dark:bg-gray-800 dark:text-gray-100 border rounded-lg p-2.5 focus:outline-none focus:ring-1 ',
          {
            'border-gray-200 dark:border-gray-700 focus:ring-gray-300/60': errorMessage == null,
            'border-red-600/40 dark:border-red-600/50 focus:ring-red-600/30': errorMessage != null
          }
        )}
        {...register(name, { setValueAs: (v) => v === '' ? undefined : v })}
      />
    </FormField>
  )
}

interface ModalQrReaderProps {
  callback: (result: string) => void
  validation?: (result: string) => boolean
}

function ModalQrReader ({ close, props: { callback, validation } }: ModalProps<ModalQrReaderProps>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleResult = (result: string | null) => {
    if (result == null) return

    callback(result)
    close()
  }

  return (
    <div
      className='w-screen h-screen grid place-items-center relative'
    >
      <button
        type='button'
        className='absolute top-4 right-4'
        onClick={close}
      >
        <CrossIcon className='w-8 h-8' />
      </button>
      {/* <QrLector
        onResult={(result) => {
          if (result) {
            handleResult(result)
          }          
        }}
        validation={validation}
      /> */}
      <div className='w-screen h-auto aspect-square md:w-auto md:h-screen p-4 md:p-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <div className='border-2 border-green-500/80 w-full h-full' />
      </div>
    </div>

  )
}
