import { ReactNode } from "react";
import { VERSION } from '../../../lib/constants/version';

type FooterProps = {
    children? : ReactNode
    footerHeight: number
    footerContent?: ReactNode
};

export function Footer({footerHeight, footerContent}: FooterProps) {
  return <footer style={{height:footerHeight}} className="z-40 w-full p-2 fixed bottom-0 bg-darkBlack">
  {footerContent}
  <p className="text-right text-xs italic">version : {VERSION} </p>
  </footer>;
}