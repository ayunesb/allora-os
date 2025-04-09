
import { Strategy } from '@/models/strategy';
import { GeneratedStrategy } from './strategy/types';

// Import from strategy with individual imports to avoid naming conflicts
import { 
  analyzeStrategy,
} from './strategy/strategyAnalysis';

// Define the StrategyAnalysis type that's missing
export interface StrategyAnalysis {
  strengths: string[];
  weaknesses: string[];
  implementationComplexity: {
    score: number;
  };
  competitiveAdvantage: {
    score: number;
  };
  insights: {
    id: string;
    type: 'positive' | 'negative' | 'neutral';
    title: string;
    description: string;
  }[];
}

// Define the missing analysis functions that were referenced
export const estimateTimeToResults = (strategy: Strategy | GeneratedStrategy): string => {
  // Simplified estimation logic
  return "3-6 months";
};

export const calculateImplementationComplexity = (strategy: Strategy | GeneratedStrategy): number => {
  // Simplified complexity calculation
  return 3; // Medium complexity
};

export const calculateCompetitiveAdvantage = (strategy: Strategy | GeneratedStrategy): number => {
  // Simplified advantage calculation  
  return 4; // Good advantage
};

export const analyzeStrategyFactors = analyzeStrategy;

// Re-export analyzeStrategy with a clear name
export { analyzeStrategy };

// Export insight functions with structured return data
export function getStrategyInsights(strategy: Strategy | GeneratedStrategy) {
  return {
    implementationComplexity: calculateImplementationComplexity(strategy),
    competitiveAdvantage: calculateCompetitiveAdvantage(strategy),
    timeToResults: estimateTimeToResults(strategy),
    analysisFactors: analyzeStrategyFactors(strategy)
  };
}
