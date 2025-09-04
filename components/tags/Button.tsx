import { ReactNode } from "react";
import { clsx } from "clsx";
import { Sizes } from "../tools";

type ButtonProps = {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  size?: keyof typeof Sizes;
}

export function Button({
  children,
  onClick,
  className,
  type = "button",
  size = "md",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(disabled 
        && "opacity-40",
        {'text-sm': size === 'sm',
          'text-md': size === 'md',
          'text-lg': size === 'lg',
          'text-xl': size === 'xl',
        },
        "grid place-items-center px-2 py-1 border-2 border-deepBlue rounded-md hover:opacity-70 transition-opacity duration-300 backdrop-blur-md", className)}
    >
      {children}
    </button>
  );
}