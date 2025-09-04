import { useCallback, FC } from 'react';
import { generateCryptoId } from '../../utils/generateCryptoId';
import { useModalContext } from './modal-context';

type ModalProps<T> = {
  component: FC<T>;
  props?: T;
};

export function useModals<T>({ component, props }: ModalProps<T>) {
  const newModalId = generateCryptoId();
  const { open, close } = useModalContext();

  const openModal = useCallback(() => {
    open({
      modalId: newModalId,
      component,
      props: {
        ...(props as object),
        close: () => close(newModalId),
      } as T,
    });
  }, [component, props, close, open, newModalId]);

  return {
    openModal,
    closeModal: () => close(newModalId),
  };
}