import React from "react";
interface BotsTabContentProps {
  onSelectBot: (bot: any) => void;
  setActiveTab: (tab: string) => void;
}
export declare const BotsTabContent: React.FC<BotsTabContentProps>;
export {};
