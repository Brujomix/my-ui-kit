import { useAuth } from "../hooks/useAuth"
import { useInput } from "../hooks/useInput"
import { Button } from "../tags/Button"
import { Input } from "../tags/Input"
import { EyesOpen, EyesClose } from "../icons"
import { z } from "zod";
import { useState } from "react"
import { FormFiled } from "../tags/FormFiled"
import { useNavigate } from "react-router-dom"

const loginSchema = z.object({
  email: z.string().email("Correo Electronico inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres")
})

export function LoginForm() {

  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const email = useInput({ type: "text", initialValue: "" })
  const password = useInput({ type: "password", initialValue: "" })

  const { LoginFirebase } = useAuth()

  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    email.asignError("");
    password.asignError("");
    setFormError(null);

    const result = loginSchema.safeParse({
      email: email.value,
      password: password.value,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      if (fieldErrors.email) email.asignError(fieldErrors.email[0]);
      if (fieldErrors.password) password.asignError(fieldErrors.password[0]);
      return;
    }

      setLoading(true)

      const resp = await LoginFirebase(result.data)

      if(resp.message === "Verified"){
        navigate("/")
      }
      
      if (resp.message === "UnVerified") {
        navigate("/verify")
        
      }

        email.reset()
        password.reset()
        setFormError(resp.message);
        setLoading(false)
      
    
  }

  return (

    <form onSubmit={onSubmit} className="grid place-content-center space-y-4 p-10 rounded-md shadow-md shadow-lightGray">
      <h1 className="text-center text-2xl">Iniciar Sessión</h1>
      <FormFiled error={email.error}>

        <Input
          {...email.bind}
          name="email"
          placeholder="Email"

        />
      </FormFiled>

      <FormFiled error={password.error}>
        <div className="relative">
          <Input
            type={password.inputType}
            name="password" placeholder="Contraseña"
            {...password.bind}
          />
          <button
            type="button"
            onClick={password.togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {password.showPassword ?
              <EyesClose className="w-5 text-darkBlack" />
              : <EyesOpen className="w-5 text-darkBlack" />}
          </button>
        </div>
      </FormFiled>


      {formError && <p className="text-red-500 text-center text-sm italic">{formError}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? <p>"Ingresando..."</p> : <p>"Ingresar"</p>}
      </Button>
    </form>


  )
}