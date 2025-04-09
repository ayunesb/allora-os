
import { 
  GeneratedStrategy, 
  StrategyRiskLevel 
} from "./types";

interface StrategyStrength {
  description: string;
  impact: "high" | "medium" | "low";
}

interface StrategyWeakness {
  description: string;
  risk: "high" | "medium" | "low";
}

interface ImplementationStep {
  description: string;
  timeframe: string;
  complexity: "high" | "medium" | "low";
}

export function analyzeStrategy(strategy: GeneratedStrategy) {
  // Get key aspects from strategy
  const name = strategy.name;
  const description = strategy.description;
  const actions = strategy.actions || [];
  const objectives = strategy.objectives || [];
  const marketFit = evaluateMarketFit(strategy);
  
  // Analyze strengths and weaknesses
  const strengths = identifyStrengths(strategy);
  const weaknesses = identifyWeaknesses(strategy);
  
  // Implementation analysis
  const implementationSteps = generateImplementationSteps(strategy);
  const timeToMarket = estimateTimeToMarket(strategy);
  const complexity = evaluateComplexity(strategy);
  
  // Competitive analysis
  const competitiveAdvantage = evaluateCompetitiveAdvantage(strategy);
  
  return {
    name,
    description,
    marketFit,
    strengths,
    weaknesses,
    implementationSteps,
    timeToMarket,
    complexity,
    competitiveAdvantage,
    objectives,
    actions
  };
}

function evaluateMarketFit(strategy: GeneratedStrategy): string {
  // Implementation would analyze the strategy against market trends
  // This is a simplified version
  const riskLevel = strategy.riskLevel;
  
  if (riskLevel === 'aggressive') {
    return "High potential return but requires strong market positioning";
  } else if (riskLevel === 'balanced') {
    return "Good market alignment with moderate competition";
  } else {
    return "Strong fit for established markets with lower disruption risk";
  }
}

function identifyStrengths(strategy: GeneratedStrategy): StrategyStrength[] {
  // In a real implementation, this would analyze the strategy text
  // and extract strengths based on NLP or predefined criteria
  
  // Sample implementation
  const strengths: StrategyStrength[] = [];
  
  if (strategy.riskLevel === 'conservative') {
    strengths.push({ 
      description: "Lower resource requirements", 
      impact: "medium" 
    });
    strengths.push({ 
      description: "Higher probability of success", 
      impact: "high" 
    });
  } else if (strategy.riskLevel === 'aggressive') {
    strengths.push({ 
      description: "Potential for market disruption", 
      impact: "high" 
    });
    strengths.push({ 
      description: "First-mover advantage opportunity", 
      impact: "high" 
    });
  }
  
  // Add general strengths based on strategy content
  strengths.push({ 
    description: "Aligned with organizational capabilities", 
    impact: "medium" 
  });
  
  return strengths;
}

function identifyWeaknesses(strategy: GeneratedStrategy): StrategyWeakness[] {
  // Similarly, this would use more sophisticated analysis in production
  
  const weaknesses: StrategyWeakness[] = [];
  
  if (strategy.riskLevel === 'conservative') {
    weaknesses.push({ 
      description: "Limited growth potential", 
      risk: "medium" 
    });
    weaknesses.push({ 
      description: "May fall behind more innovative competitors", 
      risk: "high" 
    });
  } else if (strategy.riskLevel === 'aggressive') {
    weaknesses.push({ 
      description: "Higher resource requirements", 
      risk: "high" 
    });
    weaknesses.push({ 
      description: "Increased failure risk", 
      risk: "high" 
    });
  }
  
  return weaknesses;
}

function generateImplementationSteps(strategy: GeneratedStrategy): ImplementationStep[] {
  // Convert strategy actions to implementation steps
  const steps: ImplementationStep[] = [];
  
  // Use actions to generate implementation steps
  (strategy.actions || []).forEach((action, index) => {
    const timeframe = index < 2 ? "1-3 months" : index < 4 ? "4-6 months" : "7-12 months";
    const complexity = index % 3 === 0 ? "high" : index % 2 === 0 ? "medium" : "low";
    
    steps.push({
      description: action,
      timeframe,
      complexity
    });
  });
  
  return steps;
}

function estimateTimeToMarket(strategy: GeneratedStrategy): string {
  // Based on risk level and complexity
  if (strategy.riskLevel === 'aggressive') {
    return "6-9 months (requires aggressive timeline)";
  } else if (strategy.riskLevel === 'balanced') {
    return "9-12 months (standard implementation timeline)";
  } else {
    return "12-18 months (conservative approach with lower risk)";
  }
}

function evaluateComplexity(strategy: GeneratedStrategy): "high" | "medium" | "low" {
  // Simplified complexity evaluation
  const actionsCount = (strategy.actions || []).length;
  const objectivesCount = (strategy.objectives || []).length;
  
  if (actionsCount > 5 || strategy.riskLevel === 'aggressive') {
    return "high";
  } else if (actionsCount > 3 || objectivesCount > 3) {
    return "medium";
  } else {
    return "low";
  }
}

function evaluateCompetitiveAdvantage(strategy: GeneratedStrategy): string {
  // In real implementation, this would compare against market data
  
  if (strategy.riskLevel === 'aggressive') {
    return "Potential for significant differentiation if successfully executed";
  } else if (strategy.riskLevel === 'balanced') {
    return "Moderate competitive advantage with less risk exposure";
  } else {
    return "Incremental improvement over current market offerings";
  }
}
