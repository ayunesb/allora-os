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
  progress: number; // 0-100
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
  strengthScore: number; // 1-10
  weaknessScore: number; // 1-10
  notes?: string;
  created_at: string;
};
