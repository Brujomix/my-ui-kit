import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { Main } from "../components/sections/main";
import { useSidebarContext } from "../hooks/modals/sidebar-context";
import { ModalProvider } from "../hooks";
import { Aside, Footer, Header } from "../components/sections";

type GeneralLayoutProps = {
  children: ReactNode
  asideContent?: ReactNode
};

export function GeneralLayout({ children, asideContent }: GeneralLayoutProps) {

  const { isOpen, openCloseSidebar } = useSidebarContext()

  const headerHeigth = 60
  const footerHeight = 60

  return (
    <div className="min-w-screen min-h-screen bg-darkBlack text-smokeWhite">
      <ModalProvider>
        <ToastContainer />
        <div className="grid grid-cols-1">
          <Header headerHeight={headerHeigth} onToggleAside={openCloseSidebar} />
          <Aside headerHeigth={headerHeigth} asideContent={asideContent} isOpen={isOpen} />
          <Footer footerHeight={footerHeight} />
          <Main footerHeight={footerHeight} headerHeight={headerHeigth}>
            {children}
          </Main>
        </div>
      </ModalProvider>
    </div >
  );
}