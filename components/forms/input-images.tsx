import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormField } from './form-field'
import { Button } from '../tags/button'

type InputImagesProps = {
  name: string
  label?: string
}

export function InputImagesProduct ({ name, label }: InputImagesProps) {
  const { register, formState: { errors }, setValue, setError, clearErrors } = useFormContext()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [showCross, setShowCross] = useState<boolean>(false)

  // Actualiza el canvas cuando cambia el archivo
  const handleImageChange = () => {
    const file = inputRef.current?.files?.[0]
    if (file) {
      if (file.type !== 'image/png') {
        // Archivo no soportado
        setError(name, { type: 'manual', message: 'Solo se permiten imágenes PNG.' })
        setValue(name, [])
        if (inputRef.current) inputRef.current.value = ''
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d')
          if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        }
        return
      } else if (file.size > 600 * 1024) {
        // Archivo demasiado grande
        setError(name, { type: 'manual', message: 'El archivo no debe superar los 600KB.' })
        setValue(name, [])
        if (inputRef.current) inputRef.current.value = ''
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d')
          if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        }
        return
      } else {
        clearErrors(name)
        setValue(name, [file]) // Guarda el objeto File para subir a Supabase Storage
      }
    }
    if (file && canvasRef.current) {
      setShowCross(true)
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
      reader.readAsDataURL(file)
    } else if (canvasRef.current) {
      setShowCross(false)
      // Limpiar canvas y dibujar un signo de + si no hay imagen
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
        <div className='w-40 h-40 relative mt-2 flex items-center justify-center'>
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
            width={160}
            height={160}
          />
        </div>
      </div>
    </FormField>
  )
}
