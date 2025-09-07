import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { Main } from "../components/sections/main";
import { useSidebarContext } from "../hooks/modals/sidebar-context";
import { ModalProvider } from "../hooks";
import { AlertsProvider } from "../hooks/alerts/alerts-context";
import { Aside, Header } from "../components/sections";

type GeneralLayoutProps = {
  children: ReactNode
  asideContent?: ReactNode
  footerContent?: ReactNode
};

export function GeneralLayout({ children, asideContent, footerContent }: GeneralLayoutProps) {
  const headerHeight = 60 + 8;
  const { openCloseSidebar } = useSidebarContext();
  return (
      <AlertsProvider>
        <ModalProvider>
          <ToastContainer />
          <Header headerHeight={headerHeight} onToggleAside={openCloseSidebar} />
          <Aside headerHeight={headerHeight} asideContent={asideContent} />
          <Main >
            {children}
          </Main>
        </ModalProvider>
      </AlertsProvider>
  );
}