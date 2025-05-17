import { ReactNode } from "react";

type FooterProps = {
    children : ReactNode
};

export function Footer({children}: FooterProps) {
  return <footer>{children}</footer>;
}