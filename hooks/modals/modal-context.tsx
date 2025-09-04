import React, { createContext, useContext, useState, FC, ReactNode, useCallback } from 'react';

export type Modal<T = any> = {
  modalId: string;
  component: FC<T>;
  props?: T;
};

interface ModalContextType {
  modals: Modal[];
  open: <T>(modal: Modal<T>) => void;
  close: (modalId: string) => void;
  closeAll: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<Modal[]>([]);

  const open = useCallback(<T,>(modal: Modal<T>) => {
    setModals((prev) => [...prev, modal]);
  }, []);

  const close = useCallback((modalId: string) => {
    setModals((prev) => prev.filter((m) => m.modalId !== modalId));
  }, []);

  const closeAll = useCallback(() => {
    setModals([]);
  }, []);

  return (
    <ModalContext.Provider value={{ modals, open, close, closeAll }}>
      {children}
    </ModalContext.Provider>
  );
};

export function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModalContext must be used within a ModalProvider');
  return ctx;
}
