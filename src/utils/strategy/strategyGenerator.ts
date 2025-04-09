
import { RiskProfile } from '../riskEngine';
import { lowRiskStrategies, mediumRiskStrategies, highRiskStrategies } from './strategyTemplates';
import { customizeTitle, customizeDescription, customizeROI, customizeMetrics } from './strategyCustomization';
import { GeneratedStrategy } from './types';

/**
 * Generate a fully customized business strategy based on risk profile and context
 */
export function generateCustomizedStrategy(
  riskProfile: RiskProfile,
  industryContext?: string,
  companySize?: 'Startup' | 'Small' | 'Medium' | 'Enterprise',
  primaryGoal?: 'Growth' | 'Profitability' | 'Innovation' | 'Stability'
): GeneratedStrategy {
  // Select base strategy template based on risk level
  let strategyTemplates;
  switch (riskProfile.level) {
    case 'Low':
      strategyTemplates = lowRiskStrategies;
      break;
    case 'Medium':
      strategyTemplates = mediumRiskStrategies;
      break;
    case 'High':
      strategyTemplates = highRiskStrategies;
      break;
    default:
      strategyTemplates = mediumRiskStrategies;
  }
  
  // Choose a specific template (could be random or based on other factors)
  const baseTemplate = strategyTemplates[Math.floor(Math.random() * strategyTemplates.length)];
  
  // Customize the template based on additional inputs
  const strategy: GeneratedStrategy = {
    riskLevel: riskProfile.level,
    title: customizeTitle(baseTemplate.title, industryContext, primaryGoal),
    description: customizeDescription(baseTemplate.description, industryContext, companySize),
    primaryFocus: baseTemplate.primaryFocus,
    secondaryFocus: baseTemplate.secondaryFocus,
    keyActions: baseTemplate.actions.map(action => ({
      title: action.title,
      description: action.description,
      impact: action.impact,
      timeframe: action.timeframe
    })),
    estimatedROI: customizeROI(baseTemplate.roi, companySize),
    successMetrics: customizeMetrics(baseTemplate.metrics, industryContext)
  };
  
  return strategy;
}

/**
 * Simplified strategy generator for basic use cases
 */
export function generateStrategy(riskLevel: 'Low' | 'Medium' | 'High'): {
  title: string;
  description: string;
  riskLevel: 'Low' | 'Medium' | 'High';
} {
  // Choose a template based on risk level
  let strategyTemplates;
  switch (riskLevel) {
    case 'Low':
      strategyTemplates = lowRiskStrategies;
      break;
    case 'Medium':
      strategyTemplates = mediumRiskStrategies;
      break;
    case 'High':
      strategyTemplates = highRiskStrategies;
      break;
    default:
      strategyTemplates = mediumRiskStrategies;
  }
  
  // Get a random template from the selected risk level
  const baseTemplate = strategyTemplates[Math.floor(Math.random() * strategyTemplates.length)];
  
  return {
    title: baseTemplate.title,
    description: baseTemplate.description,
    riskLevel: riskLevel
  };
}
