
import React, { createContext, useContext, useState } from "react";
import { HelpContent } from "@/types/help";

interface HelpContextProps {
  isHelpOpen: boolean;
  currentHelp: HelpContent | null;
  openHelp: () => void;
  closeHelp: () => void;
  setCurrentHelp: (content: HelpContent) => void;
}

const HelpContext = createContext<HelpContextProps | undefined>(undefined);

export function HelpProvider({ children }: { children: React.ReactNode }) {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [currentHelp, setCurrentHelp] = useState<HelpContent | null>(null);

  const openHelp = () => setIsHelpOpen(true);
  const closeHelp = () => setIsHelpOpen(false);

  return (
    <HelpContext.Provider
      value={{
        isHelpOpen,
        currentHelp,
        openHelp,
        closeHelp,
        setCurrentHelp,
      }}
    >
      {children}
    </HelpContext.Provider>
  );
}

export function useHelp(): HelpContextProps {
  const context = useContext(HelpContext);
  if (context === undefined) {
    throw new Error("useHelp must be used within a HelpProvider");
  }
  return context;
}
