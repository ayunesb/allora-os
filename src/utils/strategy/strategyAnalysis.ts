
import { GeneratedStrategy, KeyAction, StrategyObjective } from './types';
import { RiskProfile } from '../riskEngine';
import { RiskAssessmentInput } from '../riskEngine';

/**
 * Analyzes the strategy's strengths, weaknesses, and key success factors
 */
export function analyzeStrategyFactors(
  strategy: GeneratedStrategy,
  riskProfile: RiskProfile
): {
  strengths: string[];
  weaknesses: string[];
  keySuccessFactors: string[];
} {
  // Identify strengths based on the strategy and risk profile
  const strengths = [
    `Aligned with ${riskProfile.level} risk appetite`,
    `Clear focus on ${strategy.keyObjectives.map(o => o.description).join(', ')}`,
    `Balanced approach to short and long-term actions`,
    ...generateStrengthsBasedOnObjectives(strategy.keyObjectives),
  ];

  // Identify weaknesses based on the strategy
  const weaknesses = [
    `May require significant resources for execution`,
    `Success depends on market conditions staying relatively stable`,
    `Some initiatives have interdependencies that could cause delays`,
    ...generateWeaknessesBasedOnActions(strategy.keyActions),
  ];

  // Identify key success factors
  const keySuccessFactors = [
    `Strong team alignment and communication`,
    `Regular monitoring and adjustment of tactics`,
    `Sufficient resource allocation to high-priority initiatives`,
    `Ability to quickly adapt to changing market conditions`,
    `Clear accountability for key action items`,
  ];

  return {
    strengths,
    weaknesses,
    keySuccessFactors,
  };
}

/**
 * Calculate implementation complexity score (0-100)
 */
export function calculateImplementationComplexity(
  strategy: GeneratedStrategy,
  assessmentInput: RiskAssessmentInput
): {
  score: number;
  factors: string[];
} {
  // Base complexity starts at 50 (medium)
  let complexityScore = 50;
  
  // Modify based on number of actions
  complexityScore += strategy.keyActions.length * 3;
  
  // Modify based on action timeframes
  const longTermActions = strategy.keyActions.filter(a => a.timeframe === 'Long-term').length;
  complexityScore += longTermActions * 5;
  
  // Modify based on organizational readiness
  if (assessmentInput.organizationalReadiness) {
    complexityScore -= (assessmentInput.organizationalReadiness - 3) * 10;
  }
  
  // Modify based on action impact levels
  const highImpactActions = strategy.keyActions.filter(a => a.impact === 'High').length;
  complexityScore += highImpactActions * 5;
  
  // Ensure score is within 0-100 range
  complexityScore = Math.max(0, Math.min(100, complexityScore));
  
  // Factors affecting complexity
  const factors = [
    `${strategy.keyActions.length} discrete action items to implement`,
    `${longTermActions} long-term initiatives requiring sustained effort`,
    `${highImpactActions} high-impact actions requiring significant resources`,
  ];
  
  if (assessmentInput.organizationalReadiness) {
    factors.push(`Organizational readiness level: ${assessmentInput.organizationalReadiness}/5`);
  }
  
  return {
    score: complexityScore,
    factors,
  };
}

/**
 * Calculate competitive advantage score (0-100)
 */
export function calculateCompetitiveAdvantage(
  strategy: GeneratedStrategy,
  riskProfile: RiskProfile
): {
  score: number;
  factors: string[];
} {
  // Base advantage starts at 50 (medium)
  let advantageScore = 50;
  
  // Risk profile adjustments
  switch (riskProfile.level) {
    case 'High':
      advantageScore += 15;
      break;
    case 'Medium':
      advantageScore += 5;
      break;
    case 'Low':
      advantageScore -= 5;
      break;
  }
  
  // Adjust based on innovativeness of objectives
  const innovativeObjectives = strategy.keyObjectives.filter(o => 
    o.description.toLowerCase().includes('innovat') || 
    o.description.toLowerCase().includes('disrupt') ||
    o.description.toLowerCase().includes('transform')
  ).length;
  
  advantageScore += innovativeObjectives * 8;
  
  // Adjust based on differentiation in actions
  const differentiatingActions = strategy.keyActions.filter(a =>
    a.description.toLowerCase().includes('unique') ||
    a.description.toLowerCase().includes('proprietary') ||
    a.description.toLowerCase().includes('exclusive')
  ).length;
  
  advantageScore += differentiatingActions * 10;
  
  // Ensure score is within 0-100 range
  advantageScore = Math.max(0, Math.min(100, advantageScore));
  
  // Factors affecting advantage
  const factors = [
    `${riskProfile.level} risk appetite potentially yielding greater returns`,
    `${innovativeObjectives} objectives focused on innovation or disruption`,
    `${differentiatingActions} actions creating unique market positioning`,
  ];
  
  return {
    score: advantageScore,
    factors,
  };
}

/**
 * Estimate timeframe to results and key milestones
 */
export function estimateTimeToResults(
  strategy: GeneratedStrategy,
  riskProfile: RiskProfile
): {
  timeframe: string;
  confidenceLevel: 'Low' | 'Medium' | 'High';
  milestones: { description: string; timeframe: string }[];
} {
  // Analyze action timeframes
  const shortTermActions = strategy.keyActions.filter(a => a.timeframe === 'Short-term');
  const mediumTermActions = strategy.keyActions.filter(a => a.timeframe === 'Medium-term');
  const longTermActions = strategy.keyActions.filter(a => a.timeframe === 'Long-term');
  
  // Determine overall timeframe
  let timeframe: string;
  let confidenceLevel: 'Low' | 'Medium' | 'High';
  
  if (longTermActions.length > (shortTermActions.length + mediumTermActions.length)) {
    timeframe = '12-24 months';
    confidenceLevel = 'Low';
  } else if (mediumTermActions.length > shortTermActions.length) {
    timeframe = '6-12 months';
    confidenceLevel = 'Medium';
  } else {
    timeframe = '3-6 months';
    confidenceLevel = 'High';
  }
  
  // Adjust based on risk profile
  if (riskProfile.level === 'High') {
    confidenceLevel = confidenceLevel === 'High' ? 'Medium' : 'Low';
  } else if (riskProfile.level === 'Low') {
    confidenceLevel = confidenceLevel === 'Low' ? 'Medium' : 'High';
  }
  
  // Generate key milestones
  const milestones = [
    {
      description: 'Initial implementation of short-term actions',
      timeframe: '1-2 months'
    },
    {
      description: 'First measurable results from short-term initiatives',
      timeframe: '3-4 months'
    },
    {
      description: 'Mid-term review and strategy adjustment',
      timeframe: '6 months'
    },
    {
      description: 'Long-term initiatives showing preliminary results',
      timeframe: '9-12 months'
    },
    {
      description: 'Full strategy impact assessment',
      timeframe: '12-18 months'
    }
  ];
  
  return {
    timeframe,
    confidenceLevel,
    milestones,
  };
}

// Helper function to generate strengths based on objectives
function generateStrengthsBasedOnObjectives(objectives: StrategyObjective[]): string[] {
  const strengths: string[] = [];
  
  if (objectives.some(o => o.description.toLowerCase().includes('grow') || o.description.toLowerCase().includes('expan'))) {
    strengths.push('Strong focus on growth and expansion');
  }
  
  if (objectives.some(o => o.description.toLowerCase().includes('efficien') || o.description.toLowerCase().includes('cost'))) {
    strengths.push('Emphasis on operational efficiency');
  }
  
  if (objectives.some(o => o.description.toLowerCase().includes('innovat') || o.description.toLowerCase().includes('new product'))) {
    strengths.push('Prioritizes innovation and product development');
  }
  
  if (objectives.some(o => o.description.toLowerCase().includes('customer') || o.description.toLowerCase().includes('client'))) {
    strengths.push('Customer-centric approach');
  }
  
  return strengths;
}

// Helper function to generate weaknesses based on actions
function generateWeaknessesBasedOnActions(actions: KeyAction[]): string[] {
  const weaknesses: string[] = [];
  
  if (actions.filter(a => a.impact === 'High').length > 3) {
    weaknesses.push('May be overly ambitious with too many high-impact initiatives');
  }
  
  if (actions.filter(a => a.timeframe === 'Long-term').length > actions.filter(a => a.timeframe !== 'Long-term').length) {
    weaknesses.push('Heavy reliance on long-term initiatives may delay tangible results');
  }
  
  if (!actions.some(a => a.description.toLowerCase().includes('technology') || a.description.toLowerCase().includes('digital'))) {
    weaknesses.push('May lack sufficient focus on technological advancements');
  }
  
  return weaknesses;
}
