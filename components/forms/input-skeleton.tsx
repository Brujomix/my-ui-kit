interface SkeletonProps {
  label?: string
}

export function InputSkeleton ({ label }: SkeletonProps) {
  return (
    <div className='animate-pulse flex flex-col gap-1'>
      {
        label && (
          <span className='text-sm font-medium text-gray-400'>{label}</span>
        )
      }
      <div className='w-full h-10 bg-gray-200 dark:bg-gray-700 rounded-lg' />
    </div>
  )
}
