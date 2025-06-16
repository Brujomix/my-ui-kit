import { ReactNode } from "react";

type MainProps = {
  children?: ReactNode;
  headerHeight?: number;
  footerHeight?: number;
};

export function Main({ children, headerHeight, footerHeight }: MainProps) {
  return (
    <div
      style={{
        marginTop: headerHeight && headerHeight + 10,
        marginBottom: footerHeight,
      }}
      className="h-screen rounded-t-md shadow-md shadow-deepBlue bg-darkBlue mx-4 p-2"
    >
      {children}
    </div>
  );
}
