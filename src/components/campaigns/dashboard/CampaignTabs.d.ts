interface CampaignTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}
export declare function CampaignTabs({
  activeTab,
  onTabChange,
}: CampaignTabsProps): import("react").JSX.Element;
export {};
