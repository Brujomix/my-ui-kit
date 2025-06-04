import { useModalStore } from "../hooks/useModalStore"
import { Cross } from "../icons"
import { Button } from "../tags/Button"

export function ModalProvider() {

  const { modals, close } = useModalStore()

  return (
    <>
      {modals.length > 0 && (
          <div className="z-50 bg-darkBlack/80 backdrop-blur-md grid place-content-center">
            {modals.map(({ modalId, component: Component, props }) => (
              <div key={modalId} className="w-full h-full shadow-deepGray">
                <Button className="relative w-fit" onClick={() => close(modalId)}>
                  <Cross className="w-5 text-smokeWhite" />
                </Button>
                <Component {...props} />
              </div>
            ))}
          </div>
      )
      }
    </>
  )
}

