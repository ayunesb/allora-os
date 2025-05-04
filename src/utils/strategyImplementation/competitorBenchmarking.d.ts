import { CompetitorBenchmark } from '@/models/strategyImplementation';
export declare function fetchCompetitorBenchmarks(strategyId: string): Promise<CompetitorBenchmark[]>;
export declare function createCompetitorBenchmark(benchmark: Omit<CompetitorBenchmark, 'id' | 'created_at'>): Promise<CompetitorBenchmark | null>;
export declare function updateCompetitorBenchmark(id: string, updates: Partial<Omit<CompetitorBenchmark, 'id' | 'created_at'>>): Promise<boolean>;
export declare function deleteCompetitorBenchmark(id: string): Promise<boolean>;
export declare function calculateMarketPosition(benchmarks: CompetitorBenchmark[]): {
    averageStrength: number;
    averageWeakness: number;
    relativeMarketShare: number;
    competitiveAdvantage: 'Strong' | 'Moderate' | 'Weak';
};
