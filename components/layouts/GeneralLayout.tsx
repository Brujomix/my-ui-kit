import { ReactNode } from "react";
import { ModalProvider } from "../modals/ModalProvider";
import { ToastContainer } from "react-toastify";

type GeneralLayoutProps = {
  children: ReactNode
  headerHeight : number
};

export function GeneralLayout({ children, headerHeight }: GeneralLayoutProps) {
  return (
    <div className="relative bg-darkBlack w-screen h-screen text-smokeWhite">
      <ModalProvider />
      <ToastContainer/>
      <div className="p-2" style={{paddingTop : headerHeight}}>
        {children}
      </div>
    </div >
  );
}