import { useAuth } from "../hooks/useAuth"
import { Button } from "../tags/Button"
import { useNavigate } from "react-router-dom"

type FormProps = {}

export function LoginForm({}: FormProps) {

    const {logIn} = useAuth()

    const navigate = useNavigate()

    const onSubmit = ()=>{
        logIn({displayName: "Bruno", email:"brojimix.bt@gmail.com", rol:"Admin"})

        navigate("/")
    }

  return (
    <div className="grid place-content-center space-y-4">
        <Button onClick={onSubmit} type="submit">
            <p>Iniciar Session</p>
        </Button>
    </div>
  )
}