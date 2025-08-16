import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  // Initialize state from localStorage or default to true (collapsed)
  const [isCollapsed, setIsCollapsedState] = useState<boolean>(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Persist state changes to localStorage
  const setIsCollapsed = (collapsed: boolean) => {
    setIsCollapsedState(collapsed);
    localStorage.setItem('sidebar-collapsed', JSON.stringify(collapsed));
  };

  const value: SidebarContextType = {
    isCollapsed,
    setIsCollapsed,
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
