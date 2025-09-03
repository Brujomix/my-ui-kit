import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { FormField } from './form-field'
import { FC, ReactNode } from 'react'
import { IconProps } from 'darkflow-ui/icons'

interface Props {
  label?: string
  name: string
  convertEmptyToUndefined?: boolean
  children?: ReactNode
  button?: {
    Icon: FC<IconProps>
    onClick: () => void
  }
  widthMin?: boolean
}

export function InputSelect ({ name, label, children, convertEmptyToUndefined = true, button, widthMin }: Props) {
  const { register, formState: { errors } } = useFormContext()

  const three = name.split('.')
  const isArray = three.length > 1

  const errorMessage =
      !isArray
        ? errors?.[name]?.message as string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        : (errors as any)?.[three[0]]?.[parseInt(three[1])]?.[three[2]]?.message as string

  return (
    <FormField
      widthMin={widthMin}
      label={label}
      error={errorMessage}
    >
      <select
        className={clsx(
          'text-sm font-medium text-gray-900 bg-white dark:bg-gray-800 dark:text-gray-100 border rounded-lg p-2.5 focus:outline-none focus:ring-1 ',
          {
            'border-gray-200 dark:border-gray-700 focus:ring-gray-300/60': errorMessage == null,
            'border-red-600/40 dark:border-red-600/50 focus:ring-red-600/30': errorMessage != null
          }
        )}
        {...register(name, { setValueAs: convertEmptyToUndefined ? (v) => v === '' ? undefined : v : undefined })}
      >
        {children}
      </select>
      {
        button && (
          <button
            type='button'
            className='absolute right-5 top-1/2 transform -translate-y-1/2'
            // eslint-disable-next-line react/jsx-handler-names
            onClick={button.onClick}
          >
            <button.Icon className='w-5 h-5 opacity-80' />
          </button>
        )
      }
    </FormField>
  )
}
