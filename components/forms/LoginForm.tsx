import { useAuth } from "../hooks/useAuth"
import { useInput } from "../hooks/useInput"
import { Button } from "../tags/Button"
import { useNavigate } from "react-router-dom"
import { Input } from "../tags/Input"
import { EyesOpen, EyesClose } from "../icons"

type FormProps = {}

export function LoginForm({ }: FormProps) {

  const name = useInput({ type: "text", initialValue: "" })
  const email = useInput({ type: "text", initialValue: "" })
  const password = useInput({ type: "password", initialValue: "" })

  const { logIn } = useAuth()

  const navigate = useNavigate()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    /* logIn({displayName: "Bruno", email:"brojimix.bt@gmail.com", rol:"Admin"})
    navigate("/") */
    
    console.log(name.value, email.value, password.value);

    name.reset()
    email.reset()
    password.reset()

  }

  return (
    <div className="bg-lightGray/80 grid place-content-center space-y-4 w-full h-full rounded-md shadow-md shadow-lightGray">
      <h1 className="text-center text-2xl">Iniciar Sessión</h1>
      <Input {...name.bind} name="name" placeholder="Nombre" />
      <Input {...email.bind} name="email" placeholder="Email" />

      <div className="relative">
        <Input
          type={password.inputType}
          name="password" placeholder="Contraseña"
          {...password.bind}
        />
        <button
          type="button"
          onClick={password.togglePasswordVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-500"
        >
          {password.showPassword ? 
            <EyesClose className="w-5 text-darkBlack" /> 
          : <EyesOpen className="w-5 text-darkBlack" />}
        </button>
      </div>

      <Button onClick={onSubmit} type="submit">
        <p>Iniciar Session</p>
      </Button>
    </div>
  )
}