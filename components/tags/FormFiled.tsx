import { ReactNode } from "react"

type FormFiledProps = {
  error?: string
  children: ReactNode
}

export function FormFiled({ error, children }: FormFiledProps) {
  return (
    <div className="grid space-y-2 relative">
      {children}
      {error && (
        <p className="absolute bottom-0 right-1 text-red-500 text-center italic text-xs">{error}</p>
      )}
    </div>
  )
}