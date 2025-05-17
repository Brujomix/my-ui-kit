import { ReactNode } from "react";

type HeaderProps = {
    children : ReactNode
};

export function Header({children}: HeaderProps) {
  return <header>{children}</header>;
}
