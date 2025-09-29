import { useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormField } from './form-field'
import { Button } from '../tags'

type InputImagesProps = {
  name: string
  label?: string
  defaultValue?: string
}

export function InputImagesProduct ({ name, label, defaultValue }: InputImagesProps) {
  const { register, formState: { errors }, setValue } = useFormContext()
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (defaultValue != null) {
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

      <div>
        <div>
          {/* Vista previa de imágenes seleccionadas */}
          {/* Esto es solo un ejemplo, necesitarás manejar la vista previa según tus necesidades */}
          {/* {selectedImages.map((image, index) => (
            <img key={index} src={URL.createObjectURL(image)} alt={`Preview ${index}`} className='h-20 w-20 object-cover m-1' />
          ))} */}
        </div>
      </div>
    </FormField>
  )
}
