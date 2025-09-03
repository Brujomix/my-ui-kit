import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { FormField } from './form-field'
import { ChangeEvent, useEffect } from 'react'

interface Props {
  label?: string
  name: string
  accept?: string
  convertEmptyToUndefined?: boolean
}

export function InputFile ({ name, label, accept, convertEmptyToUndefined = true }: Props) {
  const { register, setValue, formState: { errors, isLoading }, clearErrors } = useFormContext()

  const errorMessage = errors?.[name]?.message as string

  useEffect(() => {
    register(name, {
      setValueAs: value => (convertEmptyToUndefined && value === '') ? undefined : value
    })
  }, [register, name, convertEmptyToUndefined])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    clearErrors(name)
    const selectedFile = event.target.files ? event.target.files[0] : undefined
    setValue(name, selectedFile)
  }

  return (
    <FormField
      label={label}
      error={errorMessage}
    >
      <input
        className={clsx(
          'text-sm font-medium text-gray-900 bg-white dark:bg-gray-800 dark:text-gray-100 border rounded-lg p-2.5 focus:outline-none focus:ring-1 ',
          {
            'border-gray-200 dark:border-gray-700 focus:ring-gray-300/60': errorMessage == null,
            'border-red-600/40 dark:border-red-600/50 focus:ring-red-600/30': errorMessage != null
          }
        )}
        type='file'
        disabled={isLoading}
        accept={accept}
        onChange={handleChange}
      />
    </FormField>
  )
}
