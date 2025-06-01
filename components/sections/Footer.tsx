import { ReactNode } from "react";
import pkg from '../../../package.json';

const version = pkg.version;

type FooterProps = {
    children? : ReactNode
};

export function Footer({children}: FooterProps) {
  return <footer className="fixed bottom-0 w-full p-2">
    {children}
    <p className="text-right text-xs italic">version : {version} </p>
  </footer>;
}