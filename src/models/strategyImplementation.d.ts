export type ImplementationStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "delayed";
export type StrategyMilestone = {
  id: string;
  strategyId: string;
  title: string;
  description?: string;
  dueDate: string;
  status: ImplementationStatus;
  progress: number;
  owner?: string;
  notes?: string;
  created_at: string;
};
export type StrategyRoi = {
  id: string;
  strategyId: string;
  initialInvestment: number;
  projectedRevenue: number;
  timeframeMonths: number;
  annualCosts: number;
  projectedROI: number;
  actualRevenue?: number;
  actualCosts?: number;
  actualROI?: number;
  lastUpdated: string;
};
export type CompetitorBenchmark = {
  id: string;
  strategyId: string;
  competitorName: string;
  marketShare: number;
  strengthScore: number;
  weaknessScore: number;
  notes?: string;
  created_at: string;
};
