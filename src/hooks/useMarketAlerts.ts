
import { useState, useCallback, useEffect } from 'react';

interface MarketAlert {
  id: string;
  title: string;
  description: string;
  relatedStrategyId?: string;
  severity: 'low' | 'medium' | 'high';
}

export function useMarketAlerts() {
  const [alerts, setAlerts] = useState<MarketAlert[]>([]);
  
  // Mock alerts data - in a real implementation, these would come from an API
  const mockAlerts: MarketAlert[] = [
    {
      id: 'alert-1',
      title: 'Market Alert: AI Breakthrough',
      description: 'Recent advancements in AI may impact your expansion strategy. Consider updating your plan to incorporate these technologies.',
      relatedStrategyId: 'demo-1',
      severity: 'medium'
    },
    {
      id: 'alert-2',
      title: 'Economic Shift: Interest Rate Changes',
      description: 'The central bank has announced a rate change that could affect your financial planning. Review your operational strategy accordingly.',
      relatedStrategyId: 'demo-2',
      severity: 'high'
    }
  ];
  
  const checkForAlerts = useCallback(() => {
    // Simulate API call with 20% chance of new alerts
    const hasAlerts = Math.random() < 0.2;
    
    if (hasAlerts) {
      // Select a random number of alerts (1 or 2)
      const numAlerts = Math.floor(Math.random() * 2) + 1;
      setAlerts(mockAlerts.slice(0, numAlerts));
    } else {
      setAlerts([]);
    }
  }, []);
  
  const dismissAlert = useCallback((alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  }, []);
  
  return {
    alerts,
    checkForAlerts,
    dismissAlert
  };
}
