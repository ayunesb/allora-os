import React from "react";
import { LucideIcon } from "lucide-react";
interface AiBotsTabsListProps {
  isMobileView?: boolean;
  activeTab?: string;
  onTabChange?: (value: string) => void;
  tabIcons?: Record<string, LucideIcon>;
}
export declare const AiBotsTabsList: React.FC<AiBotsTabsListProps>;
export {};
