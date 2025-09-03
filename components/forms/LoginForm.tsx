import { Button } from "../tags/button"
import { Input } from "../tags/input"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { Input_Password } from "../tags/input-password";
import { useAuth } from "../../hooks";
import { FormField } from "./form-field";

const loginSchema = z.object({
  email: z.string().email("Correo Electronico inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres")
})

type FormData = z.infer<typeof loginSchema>

export function LoginForm() {

  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { 
    reset, 
    register, 
    handleSubmit, 
    formState: { errors } } 
    = useForm({ 
      resolver: 
      zodResolver(loginSchema) 
    })

  const { LoginFirebase } = useAuth()

  const navigate = useNavigate()

  const onSubmit = async (dataForm: FormData) => {

    setFormError(null);
    setLoading(true)

    try {
      
      const resp = await LoginFirebase(dataForm)

      if (resp.message === "Verified") {
        navigate("/")
      }

      if (resp.message === "UnVerified") {
        navigate("/verify")

      }

      setFormError(resp.message);
      reset()
      setLoading(false)

    } catch (error) {     
      reset()
      setFormError("Error de Conexión")
      setLoading(false)
    }
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)} className="grid place-content-center space-y-4 p-10 rounded-md shadow-md shadow-lightGray">
      <h1 className="text-center text-2xl">Iniciar Sessión</h1>
      <FormField error={errors.email?.message}>

        <Input
          {...register("email")}
          name="email"
          placeholder="Email"

        />
      </FormField>

      <FormField error={errors.password?.message}>
        <Input_Password
          {...register("password")}
          placeholder="Contraseña" />
      </FormField>


      {formError && <p className="text-red-500 text-center text-sm italic">{formError}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? <p>Ingresando...</p> : <p>Ingresar</p>}
      </Button>
    </form>


  )
}