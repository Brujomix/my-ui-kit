import { useLocation } from 'react-router-dom'
import { FC, useEffect, useRef, useState } from 'react'
import { ModalContainer } from './modal-container'
import { useModals } from './use-modals'
import { ModalProps } from '.'
import { Colors } from '../../components/tools'

export function ModalsRenderer () {
  const { modals, closeAll } = useModals()
  const { pathname } = useLocation()

  useEffect(() => {
    closeAll()
  }, [pathname, closeAll])

  return (
    <>
      {
        modals?.map(({ Component, props, modalKey, close }) => (
          <ModalRenderer key={modalKey} Component={Component} props={props} modalKey={modalKey} close={close} />
        ))
      }
    </>
  )
}

interface ModalRendererProps<T = undefined> {
  Component: FC<ModalProps<T>>
  props: T
  modalKey: string
  close: () => void
}

type ColorType = keyof typeof Colors

function ModalRenderer ({ Component, props, modalKey, close }: ModalRendererProps) {
  const disableOutsideClick = useRef(false)
  const [border, setBorder] = useState<ColorType | undefined>()

  const handleClickOutside = () => {
    if (disableOutsideClick.current === true) return
    close()
  }

  return (
    <ModalContainer
      key={modalKey}
      onClickOutside={handleClickOutside}
      border={border}
    >
      <Component
        modalKey={modalKey}
        props={props}
        close={close}
        setDisableOutsideClick={() => { disableOutsideClick.current = true }}
        setBorder={(color: ColorType) => setBorder(color)}
      />
    </ModalContainer>
  )
}
