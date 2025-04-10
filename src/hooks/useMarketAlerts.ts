
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface MarketAlert {
  id: string;
  message: string;
  link?: string;
  linkText?: string;
  affectedStrategies?: string[];
}

export function useMarketAlerts() {
  const [alerts, setAlerts] = useState<MarketAlert[]>([]);
  
  const checkForAlerts = useCallback(async () => {
    try {
      // In a real implementation, this would call an API to get market alerts
      // For now, we'll use mock data
      
      // Simulate a delay for API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // ~25% chance of getting an alert
      if (Math.random() > 0.75) {
        const mockAlerts: MarketAlert[] = [
          {
            id: `alert-${Date.now()}`,
            message: "Consider updating your Expansion Strategy in light of recent AI industry developments.",
            link: "https://example.com/ai-trends",
            linkText: "View AI Trend Report",
            affectedStrategies: ["Market Expansion", "Digital Transformation"]
          }
        ];
        
        setAlerts(mockAlerts);
      }
    } catch (error) {
      console.error("Error checking for market alerts:", error);
    }
  }, []);
  
  const dismissAlert = useCallback((alertId: string) => {
    setAlerts(current => current.filter(alert => alert.id !== alertId));
    toast.success("Alert dismissed");
  }, []);
  
  useEffect(() => {
    checkForAlerts();
    
    // In a real app, set up a polling interval or websocket connection
    const interval = setInterval(checkForAlerts, 30 * 60 * 1000); // Check every 30 minutes
    
    return () => clearInterval(interval);
  }, [checkForAlerts]);
  
  return {
    alerts,
    dismissAlert,
    checkForAlerts
  };
}
