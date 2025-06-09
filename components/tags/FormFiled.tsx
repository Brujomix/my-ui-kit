import { ReactNode } from "react"

type FormFiledProps = {
  error?: string
  children: ReactNode
}

export function FormFiled({ error, children }: FormFiledProps) {
  return (
    <div className="grid space-y-2">
      {children}
      {error && (
        <p className="text-red-500 text-center italic text-xs">{error}</p>
      )}
    </div>
  )
}