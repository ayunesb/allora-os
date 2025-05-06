// Types for AI bot consultation system

export type BotConsultation = {
  id: string;
  botName: string;
  botRole: string;
  messages: ConsultationMessage[];
};

export type ConsultationMessage = {
  type: "user" | "bot" | "system";
  content: string;
  timestamp: string;
};

export type DebateParticipant = {
  id: string;
  name: string;
  role: string;
  title: string;
  specialty: string;
  avatar?: string;
  expertise?: string[];
  background?: string;
};

export type DebateMessage = {
  id: string;
  sender: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isUser: boolean;
  votes: number;
  isFavorite: boolean;
};

export type DebateTopic = {
  id: string;
  topic: string;
  description: string;
};

export type DebateSession = {
  id: string;
  title: string;
  objective: string;
  topic: DebateTopic;
  participants: DebateParticipant[];
  messages: DebateMessage[];
  duration: number;
  company_id: string;
  created_at: string;
  riskAppetite: "low" | "medium" | "high";
  businessPriority: string;
};

export type RiskProfile = {
  level: "Low" | "Medium" | "High";
  score: number;
  factors: {
    [key: string]: number;
  };
};

export type ExecutiveBotRole =
  | "ceo"
  | "coo"
  | "cfo"
  | "cio"
  | "cmo"
  | "chro"
  | "strategy"
  | "vp_global_operations"
  | "vp_research_development"
  | "sales_business_development"
  | "operations_efficiency"
  | "marketing"
  | "customer_success"
  | "cold_calling"
  | "lead_qualification";

export type ExecutiveBot = {
  id: string;
  name: string;
  role: ExecutiveBotRole;
  title: string;
  specialization: string[];
  optimization: string;
  riskAppetite: "Low" | "Medium" | "High";
  avatar: string;
};

export type AIModelType = "gpt-4o" | "claude-3" | "gemini-1.5" | "auto";
