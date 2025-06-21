import { IModals } from "../../interfaces";
import { Button } from "../tags/Button";

type ContentDeleteModalProps = {
  initialData?: Record<string, unknown>;
  titleModal: string;
} & IModals;

export function ContentDeleteModal({
  initialData,
  titleModal,
  close
}: ContentDeleteModalProps) {
  return (
    <div>
      <p>{titleModal}</p>
      {initialData && Object.values(initialData).map((v, index) => (
        <ul key={index}>
          <li>{String(v)}</li>
        </ul>
      ))}
      <Button onClick={close}>
        <span>Eliminar</span>
      </Button>
    </div>
  );
}
