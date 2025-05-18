"use client"
import { ReactNode } from "react";
import { ToogleMode } from "../toggles/ToogleMode";
import { CurrentUser } from "../user/CurrentUser";
import { VerticalDots } from "../icons";

type HeaderProps = {
  children?: ReactNode;
};

export function Header({ children }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full p-2 flex justify-between items-center border-b border-deepGray shadow-sm shadow-smokewhite bg-smokewhite">
      <span>Brand</span>
      <div>
        {children}
        <CurrentUser displayName="User Name" />
      </div>
      <ToogleMode />
      <button onClick={() => console.log("Open Menu")}>
        <VerticalDots className="text-darkback w-6" />
      </button>
    </header>
  );
}
