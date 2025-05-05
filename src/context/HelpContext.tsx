import React, { createContext, useContext, useState } from "react";
const HelpContext = createContext(undefined);
export function HelpProvider({ children }) {
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [currentHelp, setCurrentHelp] = useState(null);
    const openHelp = () => setIsHelpOpen(true);
    const closeHelp = () => setIsHelpOpen(false);
    return (<HelpContext.Provider value={{
            isHelpOpen,
            currentHelp,
            openHelp,
            closeHelp,
            setCurrentHelp,
        }}>
      {children}
    </HelpContext.Provider>);
}
export function useHelp() {
    const context = useContext(HelpContext);
    if (context === undefined) {
        throw new Error("useHelp must be used within a HelpProvider");
    }
    return context;
}
