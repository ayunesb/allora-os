
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calculator, Target } from "lucide-react";
import { useBreakpoint } from "@/hooks/use-mobile";

interface ImplementationTabsProps {
  activeTab: string;
}

const ImplementationTabs: React.FC<ImplementationTabsProps> = ({ activeTab }) => {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  return (
    <TabsList className={`w-full ${isMobileView ? 'flex overflow-x-auto scrollbar-thin tabs-scrollable' : 'grid grid-cols-3'} rounded-none border-b border-gray-800`}>
      <TabsTrigger 
        value="implementation" 
        className={`data-[state=active]:bg-gray-800 flex items-center ${isMobileView ? 'text-xs px-2 py-1 tab-compact whitespace-nowrap' : ''}`}
      >
        <FileText className="h-4 w-4 mr-2" />
        <span className={isMobileView ? "" : ""}>
          {isMobileView ? "Implement" : "Implementation Tracker"}
        </span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="roi" 
        className={`data-[state=active]:bg-gray-800 flex items-center ${isMobileView ? 'text-xs px-2 py-1 tab-compact whitespace-nowrap' : ''}`}
      >
        <Calculator className="h-4 w-4 mr-2" />
        <span className={isMobileView ? "" : ""}>ROI Calculator</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="competitors" 
        className={`data-[state=active]:bg-gray-800 flex items-center ${isMobileView ? 'text-xs px-2 py-1 tab-compact whitespace-nowrap' : ''}`}
      >
        <Target className="h-4 w-4 mr-2" />
        <span className={isMobileView ? "" : ""}>
          {isMobileView ? "Competitors" : "Competitor Benchmarking"}
        </span>
      </TabsTrigger>
    </TabsList>
  );
};

export default ImplementationTabs;
