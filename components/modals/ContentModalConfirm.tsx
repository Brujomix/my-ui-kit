import { Button } from "../tags/Button";

type ContentConfirmModal = {
  title: string;
  close: () => void;
  callback?: () => void;
};

export function ContentModalConfirm({
  title,
  close,
  callback,
}: ContentConfirmModal) {

  const handleClickConfirm = () => {
    console.log("click");
    close();
    callback?.();
  };

  return (
    <div className="grid place-items-center gap-8">
      <p className="text-xl font-semibold text-darkBlack">{title}</p>
      <p className="text-red-700 italic text-sm">
        Esta Acción no se puede Revertir
      </p>
      <Button onClick={handleClickConfirm}>
        <p>Confirmar</p>
      </Button>
    </div>
  );
}
