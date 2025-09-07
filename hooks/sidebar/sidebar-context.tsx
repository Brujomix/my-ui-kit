import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

interface SidebarContextProps {
  isOpen: boolean;
  openCloseSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(() => {
    const stored = localStorage.getItem('sidebar-storage');
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem('sidebar-storage', JSON.stringify(isOpen));
  }, [isOpen]);

  const openCloseSidebar = useCallback(() => {
    setIsOpen((prev: boolean) => !prev);
  }, []);

  return (
    <SidebarContext.Provider value={{ isOpen, openCloseSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export function useSidebarContext() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebarContext must be used within a SidebarProvider');
  return ctx;
}
