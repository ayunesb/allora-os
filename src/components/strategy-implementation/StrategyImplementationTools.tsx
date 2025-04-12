
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ArrowRight, Calculator, Target } from "lucide-react";
import StrategyImplementationTracker from './StrategyImplementationTracker';
import StrategyRoiCalculator from './StrategyRoiCalculator';
import CompetitorBenchmarking from './CompetitorBenchmarking';

interface StrategyImplementationToolsProps {
  strategyId: string;
  strategyTitle: string;
}

const StrategyImplementationTools: React.FC<StrategyImplementationToolsProps> = ({
  strategyId,
  strategyTitle
}) => {
  const [activeTab, setActiveTab] = useState("implementation");

  return (
    <Card className="mx-auto mt-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800">
      <CardContent className="p-0">
        <Tabs defaultValue="implementation" value={activeTab} onValueChange={setActiveTab}>
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
          
          <TabsContent value="implementation" className="p-4">
            <StrategyImplementationTracker 
              strategyId={strategyId} 
              strategyTitle={strategyTitle} 
            />
          </TabsContent>
          
          <TabsContent value="roi" className="p-4">
            <StrategyRoiCalculator 
              strategyId={strategyId} 
            />
          </TabsContent>
          
          <TabsContent value="competitors" className="p-4">
            <CompetitorBenchmarking 
              strategyId={strategyId} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StrategyImplementationTools;
