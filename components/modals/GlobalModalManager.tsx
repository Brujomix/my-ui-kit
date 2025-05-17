"use client";
import { MouseEvent } from "react";
import clsx from "clsx";
import { useAppSelector, useAppDispatch, closeModal } from "../../redux";
import { RenderModal } from "./RenderModals";

export function GlobalModalManager() {
  const { modalId, props } = useAppSelector((state) => state.Modals);
  const dispatch = useAppDispatch();

  if (!modalId) return null;

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(closeModal());
  };

  return (
    <div
      onMouseDown={handleOverlayClick}
      className={clsx(
        "fixed inset-0 z-50 w-screen h-screen bg-black/50 flex items-center justify-center"
      )}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded shadow"
      >
        {RenderModal({modalId, props})}
      </div>
    </div>
  );
}

