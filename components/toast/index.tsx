import { ToastContainer as ToastContainerLibrary, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export { toast }

export interface OpenToastProps {
  message: string
}

export interface OpenToastAsync {
  onSuccess: ({ message }: OpenToastProps) => void
  onError: ({ message }: OpenToastProps) => void
  close: () => void
}

export const openToastAsync = ({ message }: OpenToastProps): OpenToastAsync => {
  const toastId = toast.loading(message, { isLoading: true })

  const onSuccess = ({ message }: OpenToastProps) => {
    toast.update(toastId, { render: message, type: 'success', isLoading: false, autoClose: 4000, closeButton: true })
  }

  const onError = ({ message }: OpenToastProps) => {
    toast.update(toastId, { render: message, type: 'error', isLoading: false, autoClose: 4000, closeButton: true })
  }

  const close = () => {
    toast.dismiss(toastId)
  }

  return { onSuccess, onError, close }
}

export function ToastContainer () {
  return (
    <ToastContainerLibrary
      theme='dark'
      position='bottom-right'
      hideProgressBar
      closeButton
      stacked={false}
      // An optional css class to set
      className=' h-min min-h-0 z-50'
      // An optional css class for the toast.
      toastClassName='h-min z-50 min-h-0 bg-gray-950 px-4 shadow-xl'
      // An optional css class to set for the toast content
      //bodyClassName='text-sm p-0 m-0 h-min min-h-0 z-50'
    />
  )
}
