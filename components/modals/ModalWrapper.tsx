import { FC } from "react";
import { Button } from "../tags/Button";
import { useModals } from "../hooks/useModal";

type ModalWrapperProps = {
  description: string
  contentModal: FC
  props? : Record<string, any>
}

export function ModalWrapper({ description, contentModal : Content, props }: ModalWrapperProps) {

  const { openModal } = useModals({
    component: Content,
    props: {
      ...props
    },
    callback: () => console.log("Modal cerrado"),
  })

  return (
    <Button onClick={openModal}>
      <p>{description}</p>
    </Button>
  )
}