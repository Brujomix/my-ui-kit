import { ReactNode } from "react";
import { ModalProvider } from "../modals/ModalProvider";
import { ToastContainer } from "react-toastify";
import { Aside, Header, Footer, useSidebarStorage } from "../../components";
import { Main } from "../sections/Main";

type GeneralLayoutProps = {
  children: ReactNode
  asideContent?: ReactNode
};

export function GeneralLayout({ children, asideContent }: GeneralLayoutProps) {

  const { isOpen, openCloseSidebar } = useSidebarStorage()

  const headerHeigth = 60
  const footerHeight = 60

  return (
    <div className="min-w-screen min-h-screen bg-darkBlack text-smokeWhite">
      <ModalProvider />
      <ToastContainer />
      <div className="grid grid-cols-1">
        <Header headerHeight={headerHeigth} onToggleAside={openCloseSidebar} />
        <Aside headerHeigth={headerHeigth} asideContent={asideContent} isOpen={isOpen} />
        <Footer footerHeight={footerHeight}/>
        <Main footerHeight={footerHeight} headerHeight={headerHeigth}>
          {children}
        </Main>
      </div>
    </div >
  );
}