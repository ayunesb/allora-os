import { LucideIcon } from "lucide-react";
export interface TabItem {
  id: string;
  label: string;
  shortLabel?: string;
  icon?: LucideIcon;
  disabled?: boolean;
  tooltip?: string;
}
interface ScrollableTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (value: string) => void;
  isLoading?: boolean;
  className?: string;
  variant?: "default" | "outline" | "pills";
}
export default function ScrollableTabs({
  tabs,
  activeTab,
  onTabChange,
  isLoading,
  className,
  variant,
}: ScrollableTabsProps): JSX.Element;
export {};
