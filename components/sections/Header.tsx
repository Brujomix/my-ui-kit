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
      "z-40 fixed border-b-2 border-darkGray top-0 w-full p-4 flex justify-between items-center backdrop-blur-md"
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
