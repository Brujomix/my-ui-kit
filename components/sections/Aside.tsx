import clsx from "clsx";
import {  ReactNode } from "react";

type AsideProps = {
  asideContent?: ReactNode
  isOpen : boolean
  headerHeigth : number
};

export function Aside({ asideContent, isOpen, headerHeigth }: AsideProps) {
  return (
    <aside 
    style={{paddingTop : headerHeigth}} 
    className={clsx(!isOpen && "hidden","z-40 p-4 fixed right-0 w-fit h-screen shadow-l shadow-md shadow-lightGray backdrop-blur-md")}>
        {asideContent}

    </aside>
  );
}