import { useModalStore } from "../hooks/useModalStore"
import { Cross } from "../icons"

export function ModalProvider() {

  const { modals, close } = useModalStore()

  return (
    < >
      {modals.length > 0 && (
        <div className="z-0 absolute inset-0 w-screen h-screen bg-darkBlack/80 backdrop-blur-md grid place-content-center">
          <div className="z-0 w-screen h-screen bg-darkBlack/80 backdrop-blur-md grid place-content-center">
            {modals.map(({ modalId, component: Component, props }) => (
              <div key={modalId} className="z-50 grid place-content-center bg-lightGray shadow-md shadow-deepGray">
                <Component {...props} />
                <button onClick={() => close(modalId)}>
                  <Cross />
                </button>
              </div>
            ))}
          </div>
        </div>
      )
      }
    </>
  )
}

