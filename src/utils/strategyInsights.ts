import { Strategy, GeneratedStrategy } from '@/types/fixed/strategyTypes';
import type {
  ImplementationStep,
  StrategyStrength,
  StrategyWeakness,
} from "@/utils/strategy/strategyAnalysis";

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

interface StrategyAnalysisResult {
  implementationComplexity: number; // Ensure this property is included
}

// Define the missing analysis functions that were referenced
export const estimateTimeToResults = (strategy: Strategy | GeneratedStrategy): string => {
  // We need to handle both Strategy and GeneratedStrategy types
  if ('riskLevel' in strategy && !('risk_level' in strategy)) {
    // This is a GeneratedStrategy
    return "3-6 months";
  } else {
    // This is a Strategy
    const riskLevel = (strategy as Strategy).riskLevel || (strategy as Strategy).risk_level;
    return riskLevel === 'High' ? "6-9 months" : riskLevel === 'Medium' ? "4-8 months" : "3-6 months";
  }
};

export const calculateImplementationComplexity = (strategy: Strategy | GeneratedStrategy): number => {
  // Handle both Strategy and GeneratedStrategy types
  if ('riskLevel' in strategy && !('risk_level' in strategy)) {
    // This is a GeneratedStrategy
    return 3; // Medium complexity
  } else {
    // This is a Strategy
    const riskLevel = (strategy as Strategy).riskLevel || (strategy as Strategy).risk_level;
    return riskLevel === 'High' ? 4 : riskLevel === 'Medium' ? 3 : 2;
  }
};

export const calculateCompetitiveAdvantage = (strategy: Strategy | GeneratedStrategy): number => {
  // Handle both Strategy and GeneratedStrategy types
  if ('riskLevel' in strategy && !('risk_level' in strategy)) {
    // This is a GeneratedStrategy
    return 4; // Good advantage
  } else {
    // This is a Strategy
    const riskLevel = (strategy as Strategy).riskLevel || (strategy as Strategy).risk_level;
    return riskLevel === 'High' ? 5 : riskLevel === 'Medium' ? 4 : 3;
  }
};

export const analyzeStrategyFactors = (
  strategy: Strategy | GeneratedStrategy
): any => {
  // For Strategy objects, we need to convert to a format compatible with analyzeStrategy function
  if (!('riskLevel' in strategy) || ('risk_level' in strategy)) {
    // Get the risk level, prioritizing riskLevel over risk_level
    const riskLevel = (strategy as Strategy).riskLevel || (strategy as Strategy).risk_level || 'Medium';
    
    // Convert Strategy to a simplified form that works with analyzeStrategy
    return {
      strengths: [
        "Aligned with business objectives",
        "Clear implementation path",
        riskLevel === 'Low' ? "Low resource requirements" : "High potential impact"
      ],
      weaknesses: [
        riskLevel === 'High' ? "Higher implementation risk" : "Limited growth potential",
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
export function getStrategyInsights(
  strategy: Strategy | GeneratedStrategy
): {
  steps: ImplementationStep[];
  strengths: StrategyStrength[];
  weaknesses: StrategyWeakness[];
  implementationComplexity: number;
  competitiveAdvantage: number;
  timeToResults: string;
  analysisFactors: any;
} {
  return {
    implementationComplexity: calculateImplementationComplexity(strategy),
    competitiveAdvantage: calculateCompetitiveAdvantage(strategy),
    timeToResults: estimateTimeToResults(strategy),
    analysisFactors: analyzeStrategyFactors(strategy)
  };
}

const getStrategyDetails = (strategy: Strategy) => {
  return {
    id: strategy.id,
    name: strategy.name,
  };
};
