
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

type HelpContent = {
  title: string;
  description: string;
  steps?: { title: string; description: string }[];
  links?: { title: string; url: string }[];
  video?: string;
};

type HelpContextType = {
  isHelpOpen: boolean;
  openHelp: () => void;
  closeHelp: () => void;
  toggleHelp: () => void;
  currentHelp: HelpContent | null;
  setCurrentHelp: (content: HelpContent | null) => void;
};

const HelpContext = createContext<HelpContextType | undefined>(undefined);

export function HelpProvider({ children }: { children: React.ReactNode }) {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [currentHelp, setCurrentHelp] = useState<HelpContent | null>(null);
  const location = useLocation();

  // Close help when route changes
  useEffect(() => {
    if (isHelpOpen) {
      setIsHelpOpen(false);
    }
  }, [location.pathname]);

  const openHelp = () => setIsHelpOpen(true);
  const closeHelp = () => setIsHelpOpen(false);
  const toggleHelp = () => setIsHelpOpen(prev => !prev);

  return (
    <HelpContext.Provider
      value={{
        isHelpOpen,
        openHelp,
        closeHelp,
        toggleHelp,
        currentHelp,
        setCurrentHelp
      }}
    >
      {children}
    </HelpContext.Provider>
  );
}

export function useHelp() {
  const context = useContext(HelpContext);
  if (context === undefined) {
    throw new Error("useHelp must be used within a HelpProvider");
  }
  return context;
}
