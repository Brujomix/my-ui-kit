import { useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormField } from './form-field'
import { Button } from '../tags'

type InputImagesProps = {
  name: string
  label?: string
  defaultValue?: boolean
}

export function InputImagesProduct ({ name, label, defaultValue = false }: InputImagesProps) {
  const { register, formState: { errors }, setValue } = useFormContext()
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue)
    }
  }, [])

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  return (

    <FormField label={label} error={errors[name]?.message as string | undefined}>
      <input
        {...register(name, { required: 'La imagen es obligatoria' })}
        ref={inputRef}
        name={name}
        type='file'
        accept='image/*'
        multiple
        style={{ display: 'none' }} // Oculta el input
      />

      <Button onClick={handleButtonClick}>
        Seleccionar imágenes
      </Button>

      {/* Canvas para mostrar la imagen por defecto o la imagenes que se carguen */}
      <div className=' mt-2 flex items-center justify-center '>
        <canvas className='w-80 h-80 border border-gray-300 rounded-md' />
      </div>
    </FormField>
  )
}
