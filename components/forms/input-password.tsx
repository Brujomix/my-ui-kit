import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { FormField } from './form-field'
import { useState } from 'react'
import { EyesCloseIcon } from '../icons/eyes-close-icon'
import { EyesOpenIcon } from '../icons/eyes-open-icon'

interface Props {
  label?: string
  name: string
  convertEmptyToUndefined?: boolean
  placeholder?: string
}

export function InputPassword ({ name, label, convertEmptyToUndefined = true, placeholder }: Props) {
  const { register, formState: { errors } } = useFormContext()
  const [showPassword, setShowPassword] = useState(false)

  const errorMessage = errors?.[name]?.message as string

  return (
    <FormField
      label={label}
      error={errorMessage}
    >
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        className={clsx(
          'text-sm font-medium text-gray-900 bg-white dark:bg-gray-800 dark:text-gray-100 border rounded-lg p-2.5 focus:outline-none focus:ring-1 ',
          {
            'border-gray-200 dark:border-gray-700 focus:ring-gray-300/60': errorMessage == null,
            'border-red-600/40 dark:border-red-600/50 focus:ring-red-600/30': errorMessage != null
          }
        )}
        {...register(name, { setValueAs: convertEmptyToUndefined ? (v) => v === '' ? undefined : v : undefined })}
      />
      <button
        type='button'
        className='absolute right-3 bottom-2'
        onClick={() => setShowPassword(!showPassword)}
      >
        {
          showPassword
            ? <EyesCloseIcon className='w-6 h-6 text-gray-500 dark:text-gray-400' />
            : <EyesOpenIcon className='w-6 h-6 text-gray-500 dark:text-gray-400' />
        }
      </button>
    </FormField>
  )
}
