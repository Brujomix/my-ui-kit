import { ReactNode } from "react";
import { clsx } from "clsx";

type ButtonProps = {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button({
  children,
  onClick,
  className,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(disabled && "opacity-40","grid place-items-center p-2 border-2 border-deepBlue rounded-md hover:opacity-70 transition-opacity duration-300 backdrop-blur-md", className)}
    >
      {children}
    </button>
  );
}