import clsx from "clsx";
import {  ReactNode } from "react";
import { useSidebarContext } from "../../hooks/modals/sidebar-context";

type AsideProps = {
  asideContent?: ReactNode
  headerHeight : number
};

export function Aside({ asideContent, headerHeight }: AsideProps) {
  const { isOpen } = useSidebarContext();
  return (
    <aside
      style={{ paddingTop: headerHeight }}
      className={clsx(!isOpen && "hidden", "z-50 px-2 fixed right-0 w-fit h-screen ")}
    >
      {asideContent}
    </aside>
  );
}