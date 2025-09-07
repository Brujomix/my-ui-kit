import { ReactNode } from "react";
import { useSidebarContext } from "../hooks/sidebar";
import { AlertsProvider } from "../hooks/alerts/alerts-context";
import { ModalsRenderer } from "../hooks/modals/modals-renderer";
import { ToastContainer } from "react-toastify";
import { Aside, Header, Main } from "../components/sections";

type GeneralLayoutProps = {
  children: ReactNode
  asideContent?: ReactNode
  footerContent?: ReactNode
  headerHeight: number
};

export function GeneralLayout({ children, asideContent, footerContent, headerHeight }: GeneralLayoutProps) {
  const { openCloseSidebar } = useSidebarContext();
  return (
    <AlertsProvider>
       <ModalsRenderer />
        <ToastContainer />
        <Header headerHeight={headerHeight} onToggleAside={openCloseSidebar} />
        <Aside
          headerHeight={headerHeight}
          asideContent={asideContent}
          footerContent={footerContent}
        />
        <Main headerHeight={headerHeight}>
          {children}
        </Main>
    </AlertsProvider>
  );
}