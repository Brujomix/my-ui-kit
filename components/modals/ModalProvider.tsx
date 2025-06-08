import { useModalStore } from "../hooks/useModalStore"
import { Cross } from "../icons"
import { Button } from "../tags/Button"
import { useEffect } from "react"


export function ModalProvider() {

  const { modals, close } = useModalStore();

  useEffect(() => {
    modals.forEach(({ modalId, component }) => {
      if (!component) {
        close(modalId);
      }
    });
  }, [modals, close]);

  return (
    <>
      {modals.length > 0 && (
        <div className="fixed z-50 bg-darkBlack/80 w-full h-screen inset-0 grid place-content-center">
          {modals.map(({ modalId, component: Component, props }) => {

            if (!Component) return null;

            return (
              <div
                key={modalId}
                className="relative bg-white text-black p-6 rounded-md shadow-md shadow-lightGray max-w-md w-full"
              >
                <Button
                  className="absolute top-2 right-2"
                  onClick={() => close(modalId)}
                >
                  <Cross className="w-4 text-black" />
                </Button>
                <div className="mt-8">
                  <Component {...props} />
                </div>

              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

