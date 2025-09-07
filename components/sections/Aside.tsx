import clsx from "clsx";
import { ReactNode, useRef } from "react";
import { useSidebarContext } from "../../hooks/sidebar/sidebar-context";
import { Footer } from "./footer";

type AsideProps = {
  asideContent?: ReactNode
  footerContent?: ReactNode
  headerHeight: number
  possition?: "left" | "right"
};

export function Aside({ asideContent, headerHeight, possition = "left", footerContent }: AsideProps) {
  const { isOpen } = useSidebarContext();
  const asideRef = useRef<HTMLDivElement>(null);

  return (
    <aside
      ref={asideRef}
      style={{ paddingTop: headerHeight }}
      className={clsx(
        !isOpen && "hidden",
        possition === "left" ? "left-0" : "right-0",
        "z-40 px-2 fixed min-w-52 h-screen bg-gray-600 flex flex-col"
      )}
    >
      {asideContent}
      <Footer footerContent={footerContent} />
    </aside>
  );
}