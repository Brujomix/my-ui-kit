import { type IconProps } from '.'

export function CartIcon ({ className }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className={className}
    >
      <path d='M7 4h14l-1.68 8.39a2 2 0 0 1-1.97 1.61H8.65l-.35 2h11a1 1 0 1 1 0 2H7a1 1 0 0 1-.98-1.2l.5-3H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3Zm0 2H5v6h13.32l1.2-6H7Zm2 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm10 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z' />
    </svg>
  )
}
