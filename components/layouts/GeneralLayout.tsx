import { ReactNode, useState } from "react";
import { ModalProvider } from "../modals/ModalProvider";
import { ToastContainer } from "react-toastify";
import { Aside, Header, Footer } from "../../components";

type GeneralLayoutProps = {
  children: ReactNode
  asideContent?: ReactNode
};

export function GeneralLayout({ children, asideContent }: GeneralLayoutProps) {

  const [openAside, setOpenAside] = useState(false)

  const headerHeigth = 60

  return (
    <div className="relative bg-darkBlack w-screen h-screen text-smokeWhite">
      <ModalProvider />
      <ToastContainer />
      <div className="" style={{ paddingTop: headerHeigth }}>
        <Header headerHeight={headerHeigth} onToggleAside={() => setOpenAside(!openAside)} />
        <Aside asideContent={asideContent} isOpen={openAside} />
        <Footer />
        <div className="p-4">
          {children}
        </div>
      </div>
    </div >
  );
}