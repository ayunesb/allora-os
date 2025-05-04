import { StrategyRoi } from '@/models/strategyImplementation';
export declare function calculateROI(initialInvestment: number, projectedRevenue: number, timeframeMonths: number, annualCosts: number): number;
export declare function fetchStrategyROI(strategyId: string): Promise<StrategyRoi | null>;
export declare function saveStrategyROI(roiData: Omit<StrategyRoi, 'id' | 'lastUpdated'>): Promise<StrategyRoi | null>;
export declare function calculatePaybackPeriod(initialInvestment: number, monthlyRevenue: number, monthlyCosts: number): number;
export declare function formatCurrency(amount: number): string;
