
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calculator, Target } from "lucide-react";
import { useBreakpoint } from "@/hooks/use-mobile";

interface ImplementationTabsProps {
  activeTab: string;
}

const ImplementationTabs: React.FC<ImplementationTabsProps> = ({ activeTab }) => {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'sm', 'mobile'].includes(breakpoint);
  const isTabletView = ['md'].includes(breakpoint);
  
  return (
    <div className="w-full max-w-full overflow-hidden">
      <TabsList className={`w-full ${isMobileView ? 'flex overflow-x-auto scrollbar-thin tabs-scrollable' : 'grid grid-cols-3'} rounded-none border-b border-gray-800`}>
        <TabsTrigger 
          value="implementation" 
          className={`data-[state=active]:bg-gray-800 flex items-center ${isMobileView ? 'text-xs px-2 py-1 tab-compact whitespace-nowrap min-w-max' : isTabletView ? 'text-sm min-w-max' : 'min-w-max'}`}
        >
          <FileText className={`${isMobileView ? 'h-3.5 w-3.5 mr-1' : 'h-4 w-4 mr-2'}`} />
          <span>
            {isMobileView ? "Implement" : isTabletView ? "Implementation" : "Implementation Tracker"}
          </span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="roi" 
          className={`data-[state=active]:bg-gray-800 flex items-center ${isMobileView ? 'text-xs px-2 py-1 tab-compact whitespace-nowrap min-w-max' : isTabletView ? 'text-sm min-w-max' : 'min-w-max'}`}
        >
          <Calculator className={`${isMobileView ? 'h-3.5 w-3.5 mr-1' : 'h-4 w-4 mr-2'}`} />
          <span>ROI Calculator</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="competitors" 
          className={`data-[state=active]:bg-gray-800 flex items-center ${isMobileView ? 'text-xs px-2 py-1 tab-compact whitespace-nowrap min-w-max' : isTabletView ? 'text-sm min-w-max' : 'min-w-max'}`}
        >
          <Target className={`${isMobileView ? 'h-3.5 w-3.5 mr-1' : 'h-4 w-4 mr-2'}`} />
          <span>
            {isMobileView ? "Competitors" : isTabletView ? "Competitors" : "Competitor Benchmarking"}
          </span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default ImplementationTabs;
