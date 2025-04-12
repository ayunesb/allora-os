
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import ImplementationTabs from './tabs/ImplementationTabs';
import ImplementationTabContent from './tabs/ImplementationTabContent';

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
          <ImplementationTabs activeTab={activeTab} />
          <ImplementationTabContent 
            strategyId={strategyId} 
            strategyTitle={strategyTitle} 
          />
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StrategyImplementationTools;
