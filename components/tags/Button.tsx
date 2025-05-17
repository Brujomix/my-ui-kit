import { ReactNode } from "react";
import { clsx } from "clsx";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
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
      className={clsx("p-2 border rounded-md", className)}
    >
      {children}
    </button>
  );
}
