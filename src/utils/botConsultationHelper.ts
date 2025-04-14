
// Re-export everything from the consultation module
export * from './consultation';

// Export our enhanced risk-adjusted strategy tools
export * from './riskEngine';

// Import the strategy templates from the correct location
import { lowRiskStrategies, mediumRiskStrategies, highRiskStrategies } from './strategy/strategyTemplates';
export { lowRiskStrategies, mediumRiskStrategies, highRiskStrategies };

// Re-export from strategy module excluding functions we want to rename
export {
  // Fix: Import the correct functions or create them if they don't exist
  // generateCustomizedStrategy,
  // generateStrategy, - removing this since it doesn't exist
  customizeTitle,
  customizeDescription,
  customizeROI,
  customizeMetrics,
} from './strategy';

// Re-export types with proper syntax for isolatedModules
export type { StrategyAction, StrategyTemplate, GeneratedStrategy } from './strategy/types';

// Re-export functions from strategyInsights with their original names
export {
  estimateTimeToResults,
  calculateImplementationComplexity,
  calculateCompetitiveAdvantage,
  analyzeStrategyFactors,
  analyzeStrategy,
  getStrategyInsights,
} from './strategyInsights';

// Re-export type with proper syntax for isolatedModules
export type { StrategyAnalysis } from './strategyInsights';

// Re-export analyzeStrategy with a different name to avoid conflicts
import { analyzeStrategy as analyzeStrategyInsights } from './strategyInsights';
export { analyzeStrategyInsights };

// Export RiskProfile type from the consultation types to avoid ambiguity
export { type RiskProfile } from './consultation/types';
