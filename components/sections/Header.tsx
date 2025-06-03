import { ReactNode } from "react";
import { ToogleMode } from "../toggles/ToogleMode";
import { CurrentUser } from "../user/CurrentUser";
import { VerticalDots } from "../icons";
import { Brand } from "../tags/Brand";

type HeaderProps = {
  children?: ReactNode;
  headerHeight: number
};

export function Header({ children, headerHeight }: HeaderProps) {
  return (
    <header
      style={{ height: headerHeight }}
      className=
      "z-50 fixed top-0 left-0 w-full p-4 flex justify-between items-center shadow-md shadow-smokeWhite backdrop-blur-md"
    >
      <Brand />
      <div>
        {children}
        <CurrentUser />
      </div>
      <ToogleMode />
      <button onClick={() => console.log("Open Menu")}>
        <VerticalDots className="w-6" />
      </button>
    </header>
  );
}
