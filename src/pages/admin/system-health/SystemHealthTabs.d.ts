import { SystemService } from "./SystemHealthPage";
interface SystemHealthTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  services: SystemService[];
  systemHealth: {
    status: "healthy" | "degraded" | "down";
    percentage: number;
  };
}
export default function SystemHealthTabs({
  activeTab,
  onTabChange,
  services,
  systemHealth,
}: SystemHealthTabsProps): JSX.Element;
export {};
