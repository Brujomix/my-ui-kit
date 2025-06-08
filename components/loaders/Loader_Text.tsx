
type LoaderTextProps = {
    text: string
}

export function Loader_Text({text}: LoaderTextProps) {
  return (
    <div className="w-full h-full flex justify-center mt-20">
        <p className="animate-pulse text-xl tracking-wider italic">{text}</p>
    </div>
  )
}