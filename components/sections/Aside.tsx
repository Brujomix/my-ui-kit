import {  ReactNode } from "react";

type AsideProps = {
  asideContent?: ReactNode
};

export function Aside({ asideContent }: AsideProps) {
  return (
    <aside  className="z-40 p-4 fixed right-0 top w-fit h-screen shadow-l shadow-md shadow-lightGray backdrop-blur-md">
  
        {asideContent}

    </aside>
  );
}