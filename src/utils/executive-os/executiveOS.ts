
import { executiveBots } from "@/backend/executiveBots";

type ThinkingModel = 'first_principles' | 'ooda_loop' | 'inversion' | 'pareto';
type DecisionFramework = 'eisenhower_matrix' | '3x3_priorities' | 'speed_delegated';
type DelegationLevel = 1 | 2 | 3 | 4 | 5;
type MentalModel = 'first_principles' | 'ooda_loop' | 'inversion' | 'pareto' | 'second_order' | 'flywheel' | 
  '10x_thinking' | 'growth_mindset' | 'okrs' | 'circle_of_competence' | 'reality_distortion' | 'storybrand' | 
  'triple_bottom_line' | 'meddic' | 'hunting_farming' | 'servant_leadership' | 'critical_path' | 'jobs_to_be_done' | 
  'design_thinking' | 'build_measure_learn' | 'user_journey' | 'lean_management' | 'consumer_creation' | 
  'bimodal_it' | 'data_lakehouse' | 'agile_marketing' | 'net_promoter' | 'digital_twin' | 'service_blueprinting' | 
  'knowledge_distillation' | 'self_supervised' | 'alphafold' | 'work_rules_culture' | 'belonging_equity' | 
  '360_feedback' | 'excellence_model' | 'zero_trust' | 'network_effects';

type StrategicFocus = 'growth' | 'innovation' | 'efficiency' | 'customer_experience' | 'quality' | 
  'sustainability' | 'talent_development' | 'market_expansion' | 'digital_transformation' | 
  'product_development' | 'operational_excellence' | 'financial_optimization' | 'risk_management';

export interface ExecutiveOSFeatures {
  thinkingModels: ThinkingModel[];
  decisionFramework: DecisionFramework;
  delegationLevel: DelegationLevel;
  dailyCommands: string[];
  crisisProtocol: boolean;
  strategicSprints: boolean;
  scaleUpSystem: boolean;
  mentalModelLibrary: MentalModel[];
}

export interface CognitiveBoost {
  type: string;
  description: string;
  applicationAreas: string[];
}

export interface ExecutivePersonality {
  name: string;
  role: string;
  modeledAfter: string;
  personalityTraits: string[];
  cognitiveBoost?: CognitiveBoost;
  mentalModel?: MentalModel;
  strategicFocus?: StrategicFocus;
}

// Map of executives to their cognitive boosts and mental models
export const executiveBoosts: Record<string, {boost: string, model: MentalModel, strategicFocus: StrategicFocus}> = {
  "Elon Musk": { boost: "Moonshot thinking", model: "10x_thinking", strategicFocus: "innovation" },
  "Jeff Bezos": { boost: "Operational scaling", model: "flywheel", strategicFocus: "operational_excellence" },
  "Satya Nadella": { boost: "Adaptive leadership", model: "growth_mindset", strategicFocus: "digital_transformation" },
  "Tim Cook": { boost: "Execution excellence", model: "okrs", strategicFocus: "quality" },
  "Warren Buffett": { boost: "Risk management", model: "circle_of_competence", strategicFocus: "risk_management" },
  "Steve Jobs": { boost: "Creative obsession", model: "reality_distortion", strategicFocus: "product_development" },
  "Antonio Lucio": { boost: "Brand connection", model: "storybrand", strategicFocus: "market_expansion" },
  "Keith Weed": { boost: "Sustainability-driven", model: "triple_bottom_line", strategicFocus: "sustainability" },
  "Trish Bertuzzi": { boost: "Sales playbook", model: "meddic", strategicFocus: "growth" },
  "Mike Weinberg": { boost: "Pipeline focus", model: "hunting_farming", strategicFocus: "growth" },
  "Sheryl Sandberg": { boost: "Team builder", model: "servant_leadership", strategicFocus: "talent_development" },
  "Gwynne Shotwell": { boost: "Operational moonshots", model: "critical_path", strategicFocus: "efficiency" },
  "Clayton Christensen": { boost: "Disruption strategy", model: "jobs_to_be_done", strategicFocus: "innovation" },
  "Brian Chesky": { boost: "Experience innovation", model: "design_thinking", strategicFocus: "customer_experience" },
  "Reed Hastings": { boost: "Content scaling", model: "build_measure_learn", strategicFocus: "product_development" },
  "Marissa Mayer": { boost: "UX obsession", model: "user_journey", strategicFocus: "customer_experience" },
  "Doug McMillon": { boost: "Retail precision", model: "lean_management", strategicFocus: "operational_excellence" },
  "Mark Parker": { boost: "Brand inspiration", model: "consumer_creation", strategicFocus: "market_expansion" },
  "Tariq Shaukat": { boost: "Finance transformation", model: "bimodal_it", strategicFocus: "digital_transformation" },
  "Cynthia Gaylor": { boost: "Data-informed finance", model: "data_lakehouse", strategicFocus: "financial_optimization" },
  "Megan Clarken": { boost: "Adtech innovation", model: "agile_marketing", strategicFocus: "digital_transformation" },
  "Toni Wittig": { boost: "Client loyalty", model: "net_promoter", strategicFocus: "customer_experience" },
  "Martha Heller": { boost: "IT modernization", model: "digital_twin", strategicFocus: "digital_transformation" },
  "Andy Hornby": { boost: "Service optimization", model: "service_blueprinting", strategicFocus: "efficiency" },
  "Jeff Dean": { boost: "AI scaling", model: "knowledge_distillation", strategicFocus: "innovation" },
  "Yann LeCun": { boost: "ML scaling", model: "self_supervised", strategicFocus: "innovation" },
  "Demis Hassabis": { boost: "AI for discovery", model: "alphafold", strategicFocus: "innovation" },
  "Laszlo Bock": { boost: "Talent growth", model: "work_rules_culture", strategicFocus: "talent_development" },
  "Pat Wadors": { boost: "Inclusion engine", model: "belonging_equity", strategicFocus: "talent_development" },
  "Jenny Dearborn": { boost: "Leadership growth", model: "360_feedback", strategicFocus: "talent_development" },
  "Anu Monga": { boost: "Global HR", model: "excellence_model", strategicFocus: "talent_development" },
  "Abby Kohnstamm": { boost: "Defense innovation", model: "zero_trust", strategicFocus: "risk_management" },
  "Caterina Fake": { boost: "Community magic", model: "network_effects", strategicFocus: "growth" }
};

// Default executive personality traits by role
export const defaultPersonalityTraits: Record<string, string[]> = {
  "ceo": ["visionary", "strategic", "decisive", "inspiring"],
  "cfo": ["analytical", "disciplined", "risk-aware", "forward-thinking"],
  "cmo": ["creative", "customer-focused", "data-driven", "innovative"],
  "cto": ["technical", "innovative", "problem-solver", "systems-thinker"],
  "coo": ["detail-oriented", "efficient", "process-focused", "team-builder"],
  "cio": ["technical", "security-focused", "strategic", "transformation-driven"],
  "chro": ["empathetic", "people-focused", "culture-builder", "coach"],
  "data_scientist": ["analytical", "curious", "methodical", "innovation-driven"],
  "strategy": ["analytical", "forward-thinking", "problem-solver", "adaptable"],
  "marketing": ["creative", "audience-focused", "growth-oriented", "brand-conscious"]
};

// Default executive OS features
export const defaultExecutiveOSFeatures: ExecutiveOSFeatures = {
  thinkingModels: ["first_principles", "ooda_loop", "inversion", "pareto"],
  decisionFramework: "eisenhower_matrix",
  delegationLevel: 3,
  dailyCommands: ["Run Daily Tactical Standup", "End Day with Reflection"],
  crisisProtocol: true,
  strategicSprints: true,
  scaleUpSystem: true,
  mentalModelLibrary: ["first_principles", "ooda_loop", "inversion", "pareto", "second_order", "flywheel"]
};

// Get all bot names for executive OS installation
export const getAllExecutiveBotNames = (): string[] => {
  return Object.values(executiveBots).flat();
};

// Get all bot roles for executive OS installation
export const getAllExecutiveBotRoles = (): string[] => {
  return Object.keys(executiveBots);
};

// Format role title (e.g., "ceo" to "Chief Executive Officer")
export const formatOSRoleTitle = (role: string): string => {
  const roleMap: Record<string, string> = {
    "ceo": "Chief Executive Officer",
    "cfo": "Chief Financial Officer",
    "cmo": "Chief Marketing Officer",
    "cto": "Chief Technology Officer",
    "coo": "Chief Operating Officer",
    "cio": "Chief Information Officer",
    "chro": "Chief Human Resources Officer",
    "vp_sales": "VP of Sales",
    "vp_product": "VP of Product",
    "vp_operations": "VP of Operations",
    "data_scientist": "Data Scientist",
    "strategy": "Strategy Consultant",
    "marketing": "Marketing Strategist"
  };

  return roleMap[role] || role.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

// Get default personality traits for a role
export const getDefaultPersonalityTraits = (role: string): string[] => {
  return defaultPersonalityTraits[role] || defaultPersonalityTraits["strategy"];
};
