import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

interface MarketAlert {
  id: string;
  message: string;
  link?: string;
  linkText?: string;
  affectedStrategies?: string[];
  trendReport?: {
    title: string;
    content: string;
    insights: string[];
    recommendations: string[];
    relatedStrategies: string[];
    externalLink?: string;
  };
}

export function useMarketAlerts() {
  const [alerts, setAlerts] = useState<MarketAlert[]>([]);

  const checkForAlerts = useCallback(async () => {
    try {
      // In a real implementation, this would call an API to get market alerts
      // For now, we'll use mock data

      // Simulate a delay for API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // ~25% chance of getting an alert
      if (Math.random() > 0.75) {
        const mockAlerts: MarketAlert[] = [
          {
            id: `alert-${Date.now()}`,
            message:
              "Consider updating your Expansion Strategy in light of recent AI industry developments.",
            affectedStrategies: ["Market Expansion", "Digital Transformation"],
            trendReport: {
              title: "AI Industry Developments: Strategic Impact Analysis",
              content:
                "Recent advancements in artificial intelligence technologies are reshaping market dynamics across industries. This report analyzes the strategic implications for businesses looking to capitalize on these trends.",
              insights: [
                "Large language models are becoming increasingly accessible to businesses of all sizes",
                "AI automation is reducing operational costs by an average of 23% in early adopter companies",
                "Competitor analysis shows 67% of market leaders have integrated AI into their core business processes",
                "Customer behavior data indicates a 34% increase in preference for AI-enhanced products and services",
              ],
              recommendations: [
                "Update your Market Expansion strategy to prioritize AI-ready markets first",
                "Allocate resources to reskill teams in AI implementation and management",
                "Consider strategic partnerships with AI technology providers",
                "Develop an AI ethics framework to ensure responsible implementation",
                "Implement a phased approach to digital transformation with clear ROI metrics",
              ],
              relatedStrategies: [
                "Market Expansion",
                "Digital Transformation",
                "Product Development",
                "Competitive Positioning",
              ],
              externalLink: "https://example.com/ai-trends",
            },
          },
        ];

        setAlerts(mockAlerts);
      }
    } catch (error) {
      console.error("Error checking for market alerts:", error);
    }
  }, []);

  const dismissAlert = useCallback((alertId: string) => {
    setAlerts((current) => current.filter((alert) => alert.id !== alertId));
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
    checkForAlerts,
  };
}
