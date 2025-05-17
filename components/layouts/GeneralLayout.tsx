import { ReactNode } from "react";

type GeneralLayout = {
    children : ReactNode
};

export function GeneralLayout({children}: GeneralLayout) {
  return <header>{children}</header>;
}