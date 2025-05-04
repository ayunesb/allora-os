import React from "react";
import { HelpContent } from "@/types/help";
interface HelpContextProps {
    isHelpOpen: boolean;
    currentHelp: HelpContent | null;
    openHelp: () => void;
    closeHelp: () => void;
    setCurrentHelp: (content: HelpContent) => void;
}
export declare function HelpProvider({ children }: {
    children: React.ReactNode;
}): JSX.Element;
export declare function useHelp(): HelpContextProps;
export {};
