import { useCallback, FC } from "react"
import { generateCryptoId } from "../utils/generateCryptoId";
import { useModalStore } from "./useModalStore";

type ModalProps<T> = {
    component: FC<T>,
    props?: T
    callback ? : ()=>void
}

export function useModals<T>({ component, props, callback }: ModalProps<T>) {

    const newModalId = generateCryptoId()

    const { open, close } = useModalStore()

    const openModal = useCallback(() => {
        open({ modalId: newModalId, component, props });
    }, [component, props]);

    return {
        openModal,
        closeModal: close,
        callback
    };
}