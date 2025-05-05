import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ImplementationTabs } from './tabs/ImplementationTabs';
import ImplementationTabContent from './tabs/ImplementationTabContent';
export function StrategyImplementationTools({ strategyId, strategyName = 'Current Strategy' }) {
    const [activeTab, setActiveTab] = useState('overview');
    const handleTabChange = (value) => {
        setActiveTab(value);
    };
    return (<Card>
      <CardHeader>
        <CardTitle>Implementation Tools</CardTitle>
        <CardDescription>
          Track and manage the implementation of "{strategyName}"
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ImplementationTabs activeTab={activeTab} onTabChange={handleTabChange}/>
        <ImplementationTabContent strategyId={strategyId} activeTab={activeTab}/>
      </CardContent>
    </Card>);
}
export default StrategyImplementationTools;
