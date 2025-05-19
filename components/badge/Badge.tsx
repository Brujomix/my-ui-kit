import clsx from "clsx"

type BadgeProps = {
    textContent ? : string
    className ? : string
    textColor? : "" 
}

export function Badge({textContent, className = ""}: BadgeProps) {
  return (
    <div className={clsx(className , "rounded-md p-1")}>{textContent}</div>
  )
}