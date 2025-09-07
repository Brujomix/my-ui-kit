import { ReactNode } from "react";
import { VERSION } from '../../../lib/constants/version';

type FooterProps = {
    children? : ReactNode
    footerContent?: ReactNode
};

export function Footer({ footerContent }: FooterProps) {
  return <footer className="py-2 absolute bottom-0 w-full">
  {footerContent}
  <p className="text-xs italic opacity-50">version : {VERSION} </p>
  </footer>;
}