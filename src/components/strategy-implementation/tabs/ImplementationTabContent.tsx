
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import StrategyImplementationTracker from '../StrategyImplementationTracker';
import StrategyRoiCalculator from '../StrategyRoiCalculator';
import CompetitorBenchmarking from '../CompetitorBenchmarking';

interface ImplementationTabContentProps {
  strategyId: string;
  strategyTitle: string;
}

const ImplementationTabContent: React.FC<ImplementationTabContentProps> = ({
  strategyId,
  strategyTitle
}) => {
  return (
    <>
      <TabsContent value="implementation" className="p-4 w-full max-w-full">
        <StrategyImplementationTracker 
          strategyId={strategyId} 
          strategyTitle={strategyTitle} 
        />
      </TabsContent>
      
      <TabsContent value="roi" className="p-4 w-full max-w-full">
        <StrategyRoiCalculator 
          strategyId={strategyId} 
        />
      </TabsContent>
      
      <TabsContent value="competitors" className="p-4 w-full max-w-full">
        <CompetitorBenchmarking 
          strategyId={strategyId} 
        />
      </TabsContent>
    </>
  );
};

export default ImplementationTabContent;
