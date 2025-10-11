import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormField } from './form-field'
import { Button } from '../tags/button'

type InputImagesProps = {
  name: string
  label?: string
}

export function InputImages ({ name, label }: InputImagesProps) {
  const { register, formState: { errors }, setValue, setError, clearErrors } = useFormContext()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [showCross, setShowCross] = useState<boolean>(false)

  // Actualiza el canvas cuando cambian los archivos
  const handleImageChange = () => {
    const files = inputRef.current?.files
    if (!files || files.length === 0) {
      setValue(name, [])
      setShowCross(false)
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d')
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
          // Dibujar un signo de + centrado
          ctx.save()
          ctx.strokeStyle = '#bbb'
          ctx.lineWidth = 6
          const w = canvasRef.current.width
          const h = canvasRef.current.height
          // Línea vertical
          ctx.beginPath()
          ctx.moveTo(w / 2, h / 4)
          ctx.lineTo(w / 2, h * 3 / 4)
          ctx.stroke()
          // Línea horizontal
          ctx.beginPath()
          ctx.moveTo(w / 4, h / 2)
          ctx.lineTo(w * 3 / 4, h / 2)
          ctx.stroke()
          ctx.restore()
        }
      }
      return
    }

    // Validar todos los archivos
    const validFiles: File[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.type !== 'image/png') {
        setError(name, { type: 'manual', message: 'Solo se permiten imágenes PNG.' })
        setValue(name, [])
        if (inputRef.current) inputRef.current.value = ''
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d')
          if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        }
        setShowCross(false)
        return
      } else if (file.size > 512 * 512) {
        setError(name, { type: 'manual', message: 'El archivo no debe superar los 600KB.' })
        setValue(name, [])
        if (inputRef.current) inputRef.current.value = ''
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d')
          if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        }
        setShowCross(false)
        return
      } else {
        validFiles.push(file)
      }
    }
    clearErrors(name)
    setValue(name, validFiles)
    setShowCross(validFiles.length > 0)

    // Mostrar la primera imagen en el canvas
    if (validFiles.length > 0 && canvasRef.current) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new window.Image()
        img.onload = () => {
          const ctx = canvasRef.current!.getContext('2d')
          if (ctx) {
            ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)
            ctx.drawImage(img, 0, 0, canvasRef.current!.width, canvasRef.current!.height)
          }
        }
        img.src = event.target?.result as string
      }
      reader.readAsDataURL(validFiles[0])
    }
  }

  // Llama a handleImageChange cuando cambia el input
  useEffect(() => {
    handleImageChange()
  }, [inputRef.current?.files])

  return (
    <FormField label={label} error={errors[name]?.message as string | undefined}>
      <input
        {...register(name, { required: 'La imagen es obligatoria' })}
        ref={inputRef}
        name={name}
        type='file'
        accept='image/png'
        multiple
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <div className='mx-auto'>
        <div className='w-24 h-24 relative mt-2 flex items-center justify-center'>
          {
            showCross && (
              <div className='z-40 absolute top-0 right-0'>
                <Button
                  color='danger'
                  onClick={(e) => {
                    e.stopPropagation()
                    if (inputRef.current) {
                      inputRef.current.value = ''
                      setValue(name, [])
                      handleImageChange()
                    }
                  }}
                >
                  x
                </Button>
              </div>
            )
            }
          <canvas
            className='border border-gray-300 rounded-md'
            ref={canvasRef}
            width={96}
            height={96}
          />
        </div>
      </div>
    </FormField>
  )
}
