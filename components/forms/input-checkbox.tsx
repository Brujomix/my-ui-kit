import { useFormContext } from 'react-hook-form'

interface Props {
  label?: string
  name: string
}

export function InputCheckbox ({ name, label }: Props) {
  const { register } = useFormContext()

  return (
    <label className='flex flex-row gap-2 items-center cursor-pointer'>
      <input
        type='checkbox'
        {
          ...register(
            name
          )
        }
        name={name}
        className='h-4 w-4 accent-gray-200'
      />
      <span className='text-sm font-medium text-gray-400'>{label}</span>
  </label>
  )
}
