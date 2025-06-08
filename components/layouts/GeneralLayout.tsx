import { ReactNode, useState } from "react";
import { ModalProvider } from "../modals/ModalProvider";
import { ToastContainer } from "react-toastify";
import { Aside, Header, Footer, useSidebarStorage } from "../../components";

type GeneralLayoutProps = {
  children: ReactNode
  asideContent?: ReactNode
};

export function GeneralLayout({ children, asideContent }: GeneralLayoutProps) {

  const {isOpen, openCloseSidebar} = useSidebarStorage()

  const headerHeigth = 60

  return (
    <div className="bg-darkBlack w-full h-screen text-smokeWhite">
      <ModalProvider />
      <ToastContainer />
      <div className="" style={{ paddingTop: headerHeigth }}>
        <Header headerHeight={headerHeigth} onToggleAside={openCloseSidebar} />
        <Aside asideContent={asideContent} isOpen={isOpen}/>
        <Footer />
        <div className="p-4">
          {children}
        </div>
      </div>
    </div >
  );
}