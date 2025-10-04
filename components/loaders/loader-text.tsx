type LoaderTextProps = {
  text: string
}

export function LoaderText ({ text }: LoaderTextProps) {
  return (
    <div className='w-full h-full flex justify-center mt-20'>
      <p className='animate-pulse text-xl tracking-wider italic'>{text}</p>
    </div>
  )
}
