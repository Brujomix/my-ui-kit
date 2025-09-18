import { ReactNode } from "react";
import { DotsIcon } from "../icons";
import { Button } from "../tags";

type HeaderProps = {
  children?: ReactNode
  headerHeight?: number
  onToggleAside: () => void
};

export function Header({ children, headerHeight, onToggleAside }: HeaderProps) {

  return (
    <header
      style={{ height: headerHeight }}
      className="z-50 fixed top-0 w-full px-4 flex justify-center items-center bg-gray-600"
    >
      <div className="absolute right-4">
        <Button onClick={onToggleAside}>
          <DotsIcon className="w-4" />
        </Button>
      </div>
      {children}
      {/* TODO: Implement dark mode toggle */}
      {/* <ToggleMode /> */}
    </header>
  );
}
