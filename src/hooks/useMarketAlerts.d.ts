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
export declare function useMarketAlerts(): {
  alerts: MarketAlert[];
  dismissAlert: (alertId: string) => void;
  checkForAlerts: () => Promise<void>;
};
export {};
