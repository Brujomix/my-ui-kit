type InputProps = React.InputHTMLAttributes<HTMLInputElement>

type InputComponentProps = {
  className?: string
} & InputProps

export function Input ({ className = '', ...props }: InputComponentProps) {
  return (
    <input
      className={`text-sm px-2 py-1 rounded border border-deepGray bg-lightGray text-darkGray focus:outline-none focus:ring-2 focus:ring-deepBlue ${className}`}
      {...props}
    />
  )
}
