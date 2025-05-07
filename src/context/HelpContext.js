import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
const HelpContext = createContext(undefined);
export function HelpProvider({ children }) {
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [currentHelp, setCurrentHelp] = useState(null);
    const openHelp = () => setIsHelpOpen(true);
    const closeHelp = () => setIsHelpOpen(false);
    return (_jsx(HelpContext.Provider, { value: {
            isHelpOpen,
            currentHelp,
            openHelp,
            closeHelp,
            setCurrentHelp,
        }, children: children }));
}
export function useHelp() {
    const context = useContext(HelpContext);
    if (context === undefined) {
        throw new Error("useHelp must be used within a HelpProvider");
    }
    return context;
}
