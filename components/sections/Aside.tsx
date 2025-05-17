import { ReactNode } from "react";

type AsideProps = {
    children : ReactNode
};

export function Aside({children}: AsideProps) {
  return <aside>{children}</aside>;
}