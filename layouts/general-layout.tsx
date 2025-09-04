import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { Main } from "../components/sections/main";
import { SidebarProvider } from "../hooks/modals/sidebar-context";
import { ModalProvider } from "../hooks";
import { AlertsProvider } from "../hooks/alerts/alerts-context";

type GeneralLayoutProps = {
  children: ReactNode
  asideContent?: ReactNode
};

export function GeneralLayout({ children, asideContent }: GeneralLayoutProps) {

  return (
    <SidebarProvider>
      <AlertsProvider>
        <ModalProvider>
          <ToastContainer />
          <Main >
            {children}
          </Main>
        </ModalProvider>
      </AlertsProvider>
    </SidebarProvider>
  );
}