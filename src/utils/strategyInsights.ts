
import { RiskProfile, RiskAssessmentInput, calculateRiskScore } from './riskEngine';
import { GeneratedStrategy, generateCustomizedStrategy } from './generateStrategy';

export type StrategyInsight = {
  id: string;
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral';
  recommendation?: string;
};

export type StrategyAnalysis = {
  strategy: GeneratedStrategy;
  riskProfile: RiskProfile;
  insights: StrategyInsight[];
  competitiveAdvantage: number; // 0-100 score
  implementationComplexity: number; // 0-100 score
  expectedTimeToResults: string;
};

export function analyzeStrategy(
  assessmentInput: RiskAssessmentInput,
  industryContext?: string,
  companySize?: 'Startup' | 'Small' | 'Medium' | 'Enterprise',
  primaryGoal?: 'Growth' | 'Profitability' | 'Innovation' | 'Stability'
): StrategyAnalysis {
  // Calculate risk profile
  const riskProfile = calculateRiskScore(assessmentInput);
  
  // Generate customized strategy
  const strategy = generateCustomizedStrategy(
    riskProfile,
    industryContext,
    companySize,
    primaryGoal
  );
  
  // Generate insights based on risk profile and inputs
  const insights = generateInsights(riskProfile, assessmentInput, strategy);
  
  // Calculate additional metrics
  const competitiveAdvantage = calculateCompetitiveAdvantage(strategy, riskProfile);
  const implementationComplexity = calculateImplementationComplexity(strategy, assessmentInput);
  const expectedTimeToResults = calculateTimeToResults(strategy, riskProfile);
  
  return {
    strategy,
    riskProfile,
    insights,
    competitiveAdvantage,
    implementationComplexity,
    expectedTimeToResults
  };
}

function generateInsights(
  riskProfile: RiskProfile,
  assessmentInput: RiskAssessmentInput,
  strategy: GeneratedStrategy
): StrategyInsight[] {
  const insights: StrategyInsight[] = [];
  
  // Risk level insights
  if (riskProfile.level === 'High') {
    insights.push({
      id: 'risk-high',
      title: 'High Risk Approach',
      description: 'Your strategy involves significant risk which could lead to outsized returns but also potential losses.',
      type: 'neutral',
      recommendation: 'Consider having contingency plans for key initiatives.'
    });
  }
  
  // Budget insights
  if (assessmentInput.budget <= 2 && strategy.keyActions.some(a => a.impact === 'High')) {
    insights.push({
      id: 'budget-constraint',
      title: 'Budget Constraints',
      description: 'Your limited budget may make it difficult to fully execute high-impact initiatives.',
      type: 'negative',
      recommendation: 'Consider phasing implementation or seeking additional funding sources.'
    });
  }
  
  // Timeframe insights
  if (assessmentInput.timeframe >= 4 && strategy.keyActions.some(a => a.timeframe === 'Long-term')) {
    insights.push({
      id: 'time-alignment',
      title: 'Aligned Time Horizons',
      description: 'Your comfort with longer timeframes aligns well with the long-term actions in your strategy.',
      type: 'positive'
    });
  }
  
  // Market volatility insights
  if (assessmentInput.marketVolatility && assessmentInput.marketVolatility >= 4) {
    insights.push({
      id: 'market-volatility',
      title: 'Market Volatility Considerations',
      description: 'The high market volatility you reported suggests a need for flexible implementation.',
      type: 'neutral',
      recommendation: 'Build in regular review points to adjust course as market conditions change.'
    });
  }
  
  // Competition insights
  if (assessmentInput.competitionIntensity && assessmentInput.competitionIntensity >= 4) {
    insights.push({
      id: 'competition-intense',
      title: 'Intense Competitive Landscape',
      description: 'Your strategy will be executed in a highly competitive environment.',
      type: 'negative',
      recommendation: 'Focus on unique differentiators and consider timing market moves strategically.'
    });
  }
  
  // Organizational readiness
  if (assessmentInput.organizationalReadiness && assessmentInput.organizationalReadiness <= 2) {
    insights.push({
      id: 'org-readiness',
      title: 'Organizational Readiness Gap',
      description: 'Your team may not be fully prepared to execute this strategy.',
      type: 'negative',
      recommendation: 'Invest in capability building and change management before full implementation.'
    });
  }
  
  // Add a balance of insight types
  if (!insights.some(i => i.type === 'positive')) {
    insights.push({
      id: 'potential-upside',
      title: 'Growth Opportunity',
      description: 'This strategy has significant upside potential if executed well.',
      type: 'positive'
    });
  }
  
  return insights;
}

function calculateCompetitiveAdvantage(strategy: GeneratedStrategy, riskProfile: RiskProfile): number {
  // Calculate based on strategy components and risk profile
  let score = 50; // Base score
  
  // Higher risk strategies typically offer more competitive advantage potential
  if (riskProfile.level === 'High') score += 20;
  else if (riskProfile.level === 'Medium') score += 10;
  
  // Adjust based on key actions
  const highImpactActions = strategy.keyActions.filter(a => a.impact === 'High').length;
  score += highImpactActions * 5;
  
  // Cap at 100
  return Math.min(score, 100);
}

function calculateImplementationComplexity(
  strategy: GeneratedStrategy,
  assessment: RiskAssessmentInput
): number {
  // Calculate complexity score (higher = more complex)
  let score = 30; // Base complexity
  
  // Add complexity for each action
  strategy.keyActions.forEach(action => {
    if (action.impact === 'High') score += 10;
    if (action.timeframe === 'Long-term') score += 10;
  });
  
  // Add complexity based on assessment factors
  if (assessment.organizationalReadiness && assessment.organizationalReadiness < 3) {
    score += 15; // Less ready = more complex
  }
  
  if (assessment.regulatoryConstraints && assessment.regulatoryConstraints > 3) {
    score += 15; // More constraints = more complex
  }
  
  // Cap at 100
  return Math.min(score, 100);
}

function calculateTimeToResults(strategy: GeneratedStrategy, riskProfile: RiskProfile): string {
  // Determine time to results based on strategy and risk
  const longTermActions = strategy.keyActions.filter(a => a.timeframe === 'Long-term').length;
  const mediumTermActions = strategy.keyActions.filter(a => a.timeframe === 'Medium-term').length;
  
  // More high-risk strategies often take longer for full results
  if (riskProfile.level === 'High') {
    return longTermActions > 0 ? '12-24 months' : '9-18 months';
  } else if (riskProfile.level === 'Medium') {
    return mediumTermActions > longTermActions ? '6-12 months' : '9-15 months';
  } else {
    return '3-9 months';
  }
}
