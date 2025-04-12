
import React from 'react';
import { FileText, Calculator, Target } from "lucide-react";
import ScrollableTabs, { TabItem } from "@/components/ui/scrollable-tabs";

interface ImplementationTabsProps {
  activeTab: string;
  onTabChange?: (value: string) => void;
}

const ImplementationTabs: React.FC<ImplementationTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: TabItem[] = [
    {
      id: "implementation",
      label: "Implementation Tracker",
      shortLabel: "Implement",
      icon: FileText
    },
    {
      id: "roi",
      label: "ROI Calculator",
      shortLabel: "ROI",
      icon: Calculator
    },
    {
      id: "competitors",
      label: "Competitor Benchmarking",
      shortLabel: "Competitors",
      icon: Target
    }
  ];
  
  return (
    <div className="w-full max-w-full overflow-hidden">
      <ScrollableTabs 
        tabs={tabs} 
        activeTab={activeTab}
        onTabChange={onTabChange}
        variant="underline"
      />
    </div>
  );
};

export default ImplementationTabs;
