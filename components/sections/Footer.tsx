import { ReactNode } from "react";
import pkg from '../../../package.json';

const version = pkg.version;

type FooterProps = {
    children? : ReactNode
    footerHeight: number
};

export function Footer({children, footerHeight}: FooterProps) {
  return <footer style={{height:footerHeight}} className="z-50 w-full p-2 fixed bottom-0 bg-darkBlack">
    {children}
    <p className=" text-right text-xs italic">version : {version} </p>
  </footer>;
}