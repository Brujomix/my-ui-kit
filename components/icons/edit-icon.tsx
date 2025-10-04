import { IconProps } from '.'

export function EditIcon ({ className }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth='2'
      className={className}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M16.862 3.487a1.5 1.5 0 0 1 2.121 2.121L7.5 17.09l-4 1 1-4 12.362-12.603z'
      />
    </svg>
  )
}
