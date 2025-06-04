import { ReactNode, useState } from "react";
import { ModalProvider } from "../modals/ModalProvider";
import { ToastContainer } from "react-toastify";
import { Aside, Header, Footer } from "../../components";

type GeneralLayoutProps = {
  children: ReactNode
  asideContent?: ReactNode
  headerHeight: number
};

export function GeneralLayout({ children, headerHeight, asideContent }: GeneralLayoutProps) {

  const [openAside, setOpenAside] = useState(false)

  return (
    <div className="relative bg-darkBlack w-screen h-screen text-smokeWhite">
      <ModalProvider />
      <ToastContainer />
      <div className="p-2" style={{ paddingTop: headerHeight }}>
        <Header headerHeight={headerHeight} onToggleAside={()=>setOpenAside(!openAside)} />
        <Aside asideContent={asideContent} isOpen={openAside} />
        <Footer />
        {children}
      </div>
    </div >
  );
}