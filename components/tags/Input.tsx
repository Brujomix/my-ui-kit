type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`px-4 py-2 rounded border border-deepGray bg-lightGray text-darkGray focus:outline-none focus:ring-2 focus:ring-deepBlue ${className}`}
      {...props}
    />
  )
}
