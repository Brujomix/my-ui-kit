import { useCallback, FC } from "react";
import { generateCryptoId } from "../../utils/generateCryptoId";
import { useModalStore } from "./useModalStore";

type ModalProps<T> = {
  component: FC<T>;
  props?: T;
};

export function useModals<T>({ component, props }: ModalProps<T>) {
  const newModalId = generateCryptoId();
  const { open, close } = useModalStore();

  const openModal = useCallback(() => {
    open({
      modalId: newModalId,
      component,
      props: {
        ...props,
        close: () => close(newModalId),
      } as T,
    });
  }, [component, props]);

  return {
    openModal,
    closeModal: () => close(newModalId),
  };
}
