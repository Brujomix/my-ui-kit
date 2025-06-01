import { useState } from "react"

type useInputProps<T> = {
  type: "text" | "number" | "checkbox" | "select" | "textarea" | "password"
  initialValue : T
}

export function useInput<T = string>({ initialValue, type = "text", }: useInputProps<T>) {

  const [value, setValue] = useState<T>(initialValue)
  const [showPassword, setShowPassword] = useState(false)

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target

    if (type === "checkbox") {
      setValue((target as HTMLInputElement).checked as unknown as T)
    } else if (type === "number") {
      setValue((parseFloat(target.value) || 0) as unknown as T)
    } else {
      setValue(target.value as unknown as T)
    }
  }

  const reset = () => setValue(initialValue)

  const togglePasswordVisibility = () => {
    if (type === "password") {
      setShowPassword(prev => !prev)
    }
  }

  return {
    value,
    onChange,
    reset,
    showPassword,
    inputType: type === "password" ? (showPassword ? "text" : "password") : type,
    togglePasswordVisibility,
    bind: {
      value: type === "checkbox" ? undefined : value,
      checked: type === "checkbox" ? (value as unknown as boolean) : undefined,
      onChange,
    },
  }
}