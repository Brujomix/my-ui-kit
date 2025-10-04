import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { FormField } from './form-field'
import { FC } from 'react'
import { Sizes } from '../tools'
import { IconProps } from '../icons'

interface Props {
  label?: string
  name: string
  convertEmptyToUndefined?: boolean
  Icon?: FC<IconProps>
  step?: string
  disabled?: boolean
  size?: keyof typeof Sizes
  maxHeight?: boolean
  hideArrows?: boolean
}

export function InputNumber ({ name, label, convertEmptyToUndefined = true, Icon, step = '1', disabled, size = Sizes.md, maxHeight, hideArrows = false }: Props) {
  const { register, formState: { errors } } = useFormContext()

  const errorMessage = errors?.[name]?.message as string

  return (
    <FormField
      label={label}
      error={errorMessage}
      size={size}
      maxHeight={maxHeight}
    >
      <input
        className={clsx({
          'text-base': size === undefined,
          'text-sm': size === 'sm',
          'text-md': size === 'md',
          'text-lg': size === 'lg',
          'text-xl': size === 'xl',
          'text-2xl': size === 'xxl',
          'text-4xl': size === 'xxxl'
        }, hideArrows && 'no-arrow-input',
        'font-medium text-gray-900 bg-white dark:bg-gray-800 dark:text-gray-100 border rounded-lg p-2.5 focus:outline-none focus:ring-1 ',
        {
          'border-gray-200 dark:border-gray-700 focus:ring-gray-300/60': errorMessage === null,
          'border-red-600/40 dark:border-red-600/50 focus:ring-red-600/30': errorMessage != null
        }
        )}
        disabled={disabled}
        type='number'
        step={step}
        {...register(name,
          {
            setValueAs: convertEmptyToUndefined ? (v) => (v === '' || v === null) ? undefined : Number(v) : undefined
          }
        )
        }
      />
      {
        Icon && (
          <Icon className='absolute right-8 bottom-0.5 transform -translate-y-1/2 w-5 h-5 opacity-80' />
        )
      }
    </FormField>
  )
}
