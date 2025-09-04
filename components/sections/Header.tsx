import { ReactNode } from "react";
import { Brand } from "../tags/brand";
import { DotsIcon } from "../icons";
import { ToggleMode } from "../toggles";

type HeaderProps = {
  children?: ReactNode
  headerHeight?: number
  onToggleAside: () => void
};

export function Header({ children, headerHeight, onToggleAside }: HeaderProps) {
  return (
    <header
      style={{ height: headerHeight }}
      className=
      "fixed top-0 w-full py-2 px-4 flex justify-between items-center"
    >
      <Brand />
      <div>
        {children}
      </div>
      <ToggleMode />
      <button onClick={onToggleAside}>
        <DotsIcon className="w-6" />
      </button>
    </header>
  );
}
