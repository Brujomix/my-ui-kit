import clsx from "clsx";
import {  ReactNode } from "react";

type AsideProps = {
  asideContent?: ReactNode
  isOpen : boolean
};

export function Aside({ asideContent, isOpen = false}: AsideProps) {
  return (
    <aside  
    className={clsx(!isOpen && "hidden","z-40 p-4 fixed right-0 top w-fit h-screen shadow-l shadow-md shadow-lightGray backdrop-blur-md")}>
  
        {asideContent}

    </aside>
  );
}