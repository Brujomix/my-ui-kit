import { LoginModal } from "../../../../app/components/modals/LoginModal";

type ModalProps = {
  modalId : string,
  props?: Record<string, unknown>
};

export function RenderModal({modalId, props}:ModalProps) {
  switch (modalId) {
    case "loginModal":
      return <LoginModal {...props} />;
    default:
      return null;
  }
}
