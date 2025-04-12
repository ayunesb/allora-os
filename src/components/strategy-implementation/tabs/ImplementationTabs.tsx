
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calculator, Target } from "lucide-react";

interface ImplementationTabsProps {
  activeTab: string;
}

const ImplementationTabs: React.FC<ImplementationTabsProps> = ({ activeTab }) => {
  return (
    <TabsList className="w-full grid grid-cols-3 rounded-none border-b border-gray-800">
      <TabsTrigger value="implementation" className="data-[state=active]:bg-gray-800">
        <FileText className="h-4 w-4 mr-2" />
        Implementation Tracker
      </TabsTrigger>
      <TabsTrigger value="roi" className="data-[state=active]:bg-gray-800">
        <Calculator className="h-4 w-4 mr-2" />
        ROI Calculator
      </TabsTrigger>
      <TabsTrigger value="competitors" className="data-[state=active]:bg-gray-800">
        <Target className="h-4 w-4 mr-2" />
        Competitor Benchmarking
      </TabsTrigger>
    </TabsList>
  );
};

export default ImplementationTabs;
