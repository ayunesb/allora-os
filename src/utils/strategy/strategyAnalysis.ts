
import { RiskProfile, RiskAssessmentInput } from '../riskEngine';
import { GeneratedStrategy } from './types';

/**
 * Analyze a strategy for its strengths, weaknesses, and key success factors
 */
export function analyzeStrategyFactors(
  strategy: GeneratedStrategy,
  riskProfile: RiskProfile
): {
  strengths: string[];
  weaknesses: string[];
  keySuccessFactors: string[];
} {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const keySuccessFactors: string[] = [];
  
  // Analyze based on risk profile
  if (riskProfile.level === 'Low') {
    strengths.push('Lower volatility and more predictable outcomes');
    strengths.push('Generally requires less resource commitment');
    weaknesses.push('May miss high-value opportunities');
    weaknesses.push('Potentially slower growth trajectory');
    keySuccessFactors.push('Consistent execution and optimization');
    keySuccessFactors.push('Strong customer retention focus');
  } else if (riskProfile.level === 'Medium') {
    strengths.push('Balanced approach to growth and stability');
    strengths.push('Adaptable to changing market conditions');
    weaknesses.push('May face resource constraints for multiple initiatives');
    weaknesses.push('Requires careful prioritization');
    keySuccessFactors.push('Effective resource allocation');
    keySuccessFactors.push('Clear go/no-go decision points');
  } else { // High risk
    strengths.push('Potential for significant market disruption');
    strengths.push('Opportunity for outsized returns and growth');
    weaknesses.push('Higher chance of significant setbacks');
    weaknesses.push('Typically requires substantial investment');
    keySuccessFactors.push('Rapid learning and adaptation capability');
    keySuccessFactors.push('Contingency planning and runway management');
  }
  
  // Analyze based on key actions
  const highImpactActions = strategy.keyActions.filter(a => a.impact === 'High').length;
  const longTermActions = strategy.keyActions.filter(a => a.timeframe === 'Long-term').length;
  
  if (highImpactActions >= 2) {
    strengths.push('Multiple high-impact initiatives can drive significant change');
    weaknesses.push('High-impact actions often require more resources to execute properly');
    keySuccessFactors.push('Effective change management and organizational alignment');
  }
  
  if (longTermActions >= 2) {
    strengths.push('Long-term focus builds sustainable competitive advantage');
    weaknesses.push('Extended time horizon increases exposure to market shifts');
    keySuccessFactors.push('Maintaining momentum and commitment through leadership changes');
  }
  
  return { strengths, weaknesses, keySuccessFactors };
}

/**
 * Calculate the implementation complexity score for a strategy
 */
export function calculateImplementationComplexity(
  strategy: GeneratedStrategy,
  assessment: RiskAssessmentInput
): { score: number; factors: string[] } {
  // Calculate complexity score (higher = more complex)
  let score = 30; // Base complexity
  const factors: string[] = [];
  
  // Add complexity for each action
  strategy.keyActions.forEach(action => {
    if (action.impact === 'High') {
      score += 10;
      factors.push(`High-impact action: ${action.title}`);
    }
    if (action.timeframe === 'Long-term') {
      score += 10;
      factors.push(`Long-term initiative: ${action.title}`);
    }
  });
  
  // Add complexity based on assessment factors
  if (assessment.organizationalReadiness && assessment.organizationalReadiness < 3) {
    score += 15; // Less ready = more complex
    factors.push('Lower organizational readiness');
  }
  
  if (assessment.regulatoryConstraints && assessment.regulatoryConstraints > 3) {
    score += 15; // More constraints = more complex
    factors.push('Significant regulatory constraints');
  }
  
  if (assessment.marketVolatility && assessment.marketVolatility > 3) {
    score += 10;
    factors.push('High market volatility');
  }
  
  if (assessment.competitionIntensity && assessment.competitionIntensity > 3) {
    score += 10;
    factors.push('Intense competitive landscape');
  }
  
  // Cap at 100
  return { 
    score: Math.min(score, 100),
    factors
  };
}

/**
 * Calculate the competitive advantage score for a strategy
 */
export function calculateCompetitiveAdvantage(
  strategy: GeneratedStrategy, 
  riskProfile: RiskProfile
): { score: number; factors: string[] } {
  let score = 50; // Base score
  const factors: string[] = [];
  
  // Higher risk strategies typically offer more competitive advantage potential
  if (riskProfile.level === 'High') {
    score += 20;
    factors.push('High-risk approach offers greater differentiation potential');
  } else if (riskProfile.level === 'Medium') {
    score += 10;
    factors.push('Balanced risk approach provides moderate differentiation');
  }
  
  // Adjust based on key actions
  const highImpactActions = strategy.keyActions.filter(a => a.impact === 'High');
  score += highImpactActions.length * 5;
  
  if (highImpactActions.length > 0) {
    factors.push(`${highImpactActions.length} high-impact initiatives enhance competitive position`);
  }
  
  // Cap at 100
  return { 
    score: Math.min(score, 100),
    factors
  };
}

/**
 * Estimate time to results for a strategy
 */
export function estimateTimeToResults(
  strategy: GeneratedStrategy, 
  riskProfile: RiskProfile
): { 
  timeframe: string; 
  confidenceLevel: 'Low' | 'Medium' | 'High';
  milestones: { description: string; timeframe: string }[];
} {
  // Determine time to results based on strategy and risk
  const longTermActions = strategy.keyActions.filter(a => a.timeframe === 'Long-term').length;
  const mediumTermActions = strategy.keyActions.filter(a => a.timeframe === 'Medium-term').length;
  const shortTermActions = strategy.keyActions.filter(a => a.timeframe === 'Short-term').length;
  
  let timeframe: string;
  let confidenceLevel: 'Low' | 'Medium' | 'High';
  const milestones: { description: string; timeframe: string }[] = [];
  
  // More high-risk strategies often take longer for full results
  if (riskProfile.level === 'High') {
    timeframe = longTermActions > 0 ? '12-24 months' : '9-18 months';
    confidenceLevel = 'Low';
    
    if (shortTermActions > 0) {
      milestones.push({ 
        description: 'Initial traction indicators', 
        timeframe: '2-3 months' 
      });
    }
    
    milestones.push({ 
      description: 'Early adopter engagement', 
      timeframe: '4-6 months' 
    });
    
    milestones.push({ 
      description: 'Preliminary market validation', 
      timeframe: '6-12 months' 
    });
    
    if (longTermActions > 0) {
      milestones.push({ 
        description: 'Full market impact', 
        timeframe: '18-24 months' 
      });
    }
  } else if (riskProfile.level === 'Medium') {
    timeframe = mediumTermActions > longTermActions ? '6-12 months' : '9-15 months';
    confidenceLevel = 'Medium';
    
    if (shortTermActions > 0) {
      milestones.push({ 
        description: 'Initial implementation results', 
        timeframe: '1-2 months' 
      });
    }
    
    milestones.push({ 
      description: 'Measurable performance improvements', 
      timeframe: '3-6 months' 
    });
    
    if (longTermActions > 0 || mediumTermActions > 0) {
      milestones.push({ 
        description: 'Strategic initiative outcomes', 
        timeframe: '9-12 months' 
      });
    }
  } else {
    timeframe = '3-9 months';
    confidenceLevel = 'High';
    
    milestones.push({ 
      description: 'Process optimizations implemented', 
      timeframe: '1-2 months' 
    });
    
    milestones.push({ 
      description: 'Efficiency gains realized', 
      timeframe: '3-5 months' 
    });
    
    milestones.push({ 
      description: 'Full implementation complete', 
      timeframe: '6-9 months' 
    });
  }
  
  return { timeframe, confidenceLevel, milestones };
}
