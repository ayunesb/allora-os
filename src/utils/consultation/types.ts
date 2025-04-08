
export interface BotMessage {
  type: 'bot';
  content: string;
  timestamp: string;
}

export interface UserMessage {
  type: 'user';
  content: string;
  timestamp: string;
}

export type ConsultationMessage = BotMessage | UserMessage;

export interface BotConsultation {
  id: string;
  botName: string;
  botRole: string;
  messages: ConsultationMessage[];
}

export interface DebateParticipant {
  id: string;
  name: string;
  role: string;
  title: string;
  specialty: string;
  avatar: string;
}

export interface DebateTopic {
  id: string;
  topic: string;
  description: string;
}

export interface DebateMessage {
  id: string;
  sender: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isUser?: boolean;
}

export interface DebateSession {
  id: string;
  title: string;
  objective: string;
  topic: DebateTopic;
  participants: DebateParticipant[];
  messages: DebateMessage[];
  created_at: Date;
  duration: number;
  company_id: string;
}

export interface DebateSummary {
  key_insights: string[];
  recommendations: string[];
  next_steps: string[];
}
