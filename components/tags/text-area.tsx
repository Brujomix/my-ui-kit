type InputProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

type InputComponentProps = {
  className?: string
} & InputProps

export function TextArea ({ className = '', ...props }: InputComponentProps) {
  return (
    <textarea
      rows={4}
      className={`overflow-y-scroll resize-none text-xs px-2 py-1 rounded border border-deepGray bg-lightGray text-darkGray focus:outline-none focus:ring-2 focus:ring-deepBlue ${className}`}
      {...props}
    />
  )
}
