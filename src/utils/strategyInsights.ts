
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
  // We need to handle both Strategy and GeneratedStrategy types
  if ('riskLevel' in strategy) {
    // This is a GeneratedStrategy
    return "3-6 months";
  } else {
    // This is a Strategy
    return "4-8 months";
  }
};

export const calculateImplementationComplexity = (strategy: Strategy | GeneratedStrategy): number => {
  // Handle both Strategy and GeneratedStrategy types
  if ('riskLevel' in strategy) {
    // This is a GeneratedStrategy
    return 3; // Medium complexity
  } else {
    // This is a Strategy
    return strategy.risk_level === 'High' ? 4 : strategy.risk_level === 'Medium' ? 3 : 2;
  }
};

export const calculateCompetitiveAdvantage = (strategy: Strategy | GeneratedStrategy): number => {
  // Handle both Strategy and GeneratedStrategy types
  if ('riskLevel' in strategy) {
    // This is a GeneratedStrategy
    return 4; // Good advantage
  } else {
    // This is a Strategy
    return strategy.risk_level === 'High' ? 5 : strategy.risk_level === 'Medium' ? 4 : 3;
  }
};

export const analyzeStrategyFactors = (strategy: Strategy | GeneratedStrategy) => {
  // For Strategy objects, we need to convert to a format compatible with analyzeStrategy function
  if (!('riskLevel' in strategy)) {
    // Convert Strategy to a simplified form that works with analyzeStrategy
    return {
      strengths: [
        "Aligned with business objectives",
        "Clear implementation path",
        strategy.risk_level === 'Low' ? "Low resource requirements" : "High potential impact"
      ],
      weaknesses: [
        strategy.risk_level === 'High' ? "Higher implementation risk" : "Limited growth potential",
        "Requires ongoing monitoring"
      ],
      keySuccessFactors: [
        "Clear strategic alignment",
        "Effective resource allocation",
        "Strong leadership commitment"
      ]
    };
  }
  
  // If it's already a GeneratedStrategy, call the original function
  return analyzeStrategy(strategy as GeneratedStrategy);
};

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
