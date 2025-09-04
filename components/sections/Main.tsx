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
    >
      {children}
    </div>
  );
}
