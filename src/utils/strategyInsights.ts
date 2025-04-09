
import { RiskProfile, RiskAssessmentInput, calculateRiskScore } from './riskEngine';
import { GeneratedStrategy, generateCustomizedStrategy } from './strategy';
import { 
  analyzeStrategyFactors,
  calculateImplementationComplexity, 
  calculateCompetitiveAdvantage,
  estimateTimeToResults
} from './strategy/strategyAnalysis';

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
  strengths: string[];
  weaknesses: string[];
  keySuccessFactors: string[];
  competitiveAdvantage: {
    score: number;
    factors: string[];
  };
  implementationComplexity: {
    score: number;
    factors: string[];
  };
  timeToResults: {
    timeframe: string;
    confidenceLevel: 'Low' | 'Medium' | 'High';
    milestones: { description: string; timeframe: string }[];
  };
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
  
  // Analyze strategy factors
  const { strengths, weaknesses, keySuccessFactors } = analyzeStrategyFactors(strategy, riskProfile);
  
  // Calculate additional metrics
  const competitiveAdvantage = calculateCompetitiveAdvantage(strategy, riskProfile);
  const implementationComplexity = calculateImplementationComplexity(strategy, assessmentInput);
  const timeToResults = estimateTimeToResults(strategy, riskProfile);
  
  return {
    strategy,
    riskProfile,
    insights,
    strengths,
    weaknesses,
    keySuccessFactors,
    competitiveAdvantage,
    implementationComplexity,
    timeToResults
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
  
  // Innovation capacity
  if (assessmentInput.innovationCapacity && assessmentInput.innovationCapacity >= 4 && 
      strategy.keyActions.some(a => a.timeframe === 'Long-term')) {
    insights.push({
      id: 'innovation-strength',
      title: 'Strong Innovation Capacity',
      description: 'Your high innovation capacity is well aligned with the ambitious elements of this strategy.',
      type: 'positive',
      recommendation: 'Consider formalizing innovation processes to sustain this advantage.'
    });
  }
  
  // Regulatory insights
  if (assessmentInput.regulatoryConstraints && assessmentInput.regulatoryConstraints >= 4) {
    insights.push({
      id: 'regulatory-burden',
      title: 'High Regulatory Constraints',
      description: 'Your regulatory environment adds complexity to strategy execution.',
      type: 'negative',
      recommendation: 'Consider dedicating resources to compliance management and regulatory monitoring.'
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
