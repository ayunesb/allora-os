
// Re-export everything from the consultation module
export * from './consultation';

// Also export our enhanced risk-adjusted strategy tools
export * from './riskEngine';

// Re-export from strategy module excluding functions we want to rename
export {
  strategyTemplates,
  generateCustomizedStrategy,
  generateStrategy,
  customizeTitle,
  customizeDescription,
  customizeROI,
  customizeMetrics,
  StrategyAction,
  StrategyTemplate,
  GeneratedStrategy
} from './strategy';

// Re-export functions from strategyInsights with their original names
export {
  estimateTimeToResults,
  calculateImplementationComplexity,
  calculateCompetitiveAdvantage,
  analyzeStrategyFactors,
  analyzeStrategy,
  getStrategyInsights,
  StrategyAnalysis
} from './strategyInsights';

// Re-export analyzeStrategy with a different name to avoid conflicts
import { analyzeStrategy as analyzeStrategyInsights } from './strategyInsights';
export { analyzeStrategyInsights };
