import { ReactNode } from "react";
import { ToogleMode } from "../toggles/ToogleMode";
import { CurrentUser } from "../user/CurrentUser";
import { VerticalDots } from "../icons";
import { Brand } from "../tags/Brand";

type HeaderProps = {
  children?: ReactNode
  headerHeight?: number
  onToggleAside : ()=>void
};

export function Header({ children, headerHeight, onToggleAside }: HeaderProps) {
  return (
    <header
      style={{ height: headerHeight }}
      className=
      "z-50 fixed border-b-2 border-darkGray top-0 w-full p-4 flex justify-between items-center backdrop-blur-md"
    >
      <Brand />
      <div>
        {children}
        <CurrentUser />
      </div>
      <ToogleMode />
      <button onClick={onToggleAside}>
        <VerticalDots className="w-6" />
      </button>
    </header>
  );
}
