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
  activeTrim?: boolean
  Icon?: FC<IconProps>
  size?: keyof typeof Sizes
  placeholder?: string
  button?: {
    Icon: FC<IconProps>
    onClick: () => void
  }
  disabled?: boolean
  widthMin?: boolean
  maxHeight?: boolean
}

export function InputText ({ name, disabled, label, convertEmptyToUndefined = true, button, placeholder, Icon, widthMin, activeTrim, size = Sizes.md, maxHeight = false }: Props) {
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
      maxHeight={maxHeight}
      size={size}
      label={label}
      error={errorMessage}
    >
      <input
        disabled={disabled}
        placeholder={placeholder}
        className={clsx({
          'text-base': size === undefined,
          'text-sm': size === 'sm',
          'text-md': size === 'md',
          'text-lg': size === 'lg',
          'text-xl': size === 'xl',
          'text-2xl': size === 'xxl',
          'text-4xl': size === 'xxxl'
        },
        'font-medium bg-white dark:bg-gray-800 border rounded-lg p-2.5 focus:outline-none focus:ring-1 ',
        {
          'border-gray-200 dark:border-gray-700 focus:ring-gray-300/60': errorMessage == null,
          'border-red-600/40 dark:border-red-600/50 focus:ring-red-600/30': errorMessage != null,
          'text-gray-900 dark:text-gray-100': !disabled,
          'text-gray-900/30 dark:text-gray-100/30': disabled,
          'pl-10': Icon != null
        }
        )}
        {...register(name, {
          setValueAs:
            convertEmptyToUndefined
              ? (v) => v === ''
                  ? undefined
                  : activeTrim
                    ? v.trim()
                    : v
              : undefined
        })}
      />
      {
        Icon != null && (
          <Icon
            className={clsx(
              'absolute left-3.5 top-1/2 transform -translate-y-1/2',
              {
                'w-4 h-4': !disabled,
                'w-4 h-4 opacity-60': disabled
              }
            )}
          />
        )
      }
      {
        button && (
          <button
            disabled={disabled}
            type='button'
            className='absolute right-3 bottom-0.5 transform -translate-y-1/2'
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
