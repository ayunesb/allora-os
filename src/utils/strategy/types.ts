
// Types for strategy generation system

export type StrategyAction = {
  title: string;
  description: string;
  impact: 'Low' | 'Medium' | 'High';
  timeframe: 'Short-term' | 'Medium-term' | 'Long-term';
};

export type GeneratedStrategy = {
  riskLevel: 'Low' | 'Medium' | 'High';
  title: string;
  description: string;
  primaryFocus: string;
  secondaryFocus: string;
  keyActions: StrategyAction[];
  estimatedROI: string;
  successMetrics: string[];
};

export type StrategyTemplate = {
  title: string;
  description: string;
  primaryFocus: string;
  secondaryFocus: string;
  actions: StrategyAction[];
  roi: string;
  metrics: string[];
};
