import { useCallback, FC } from "react"
import { generateCryptoId } from "../utils/generateCryptoId";
import { useModalStore } from "./useModalStore";

type ModalProps = {
    component: FC,
    props?: Record<string, any>
    callback ? : ()=>void
}

export function useModals({ component, props, callback }: ModalProps) {

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